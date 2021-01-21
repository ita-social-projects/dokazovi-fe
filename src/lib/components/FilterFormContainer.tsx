import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { FilterPropertiesType, FilterTypeEnum } from '../types';
import { FilterForm } from './FilterForm';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IObjForAction {
  value: ICheckboxes;
}

export interface IFilterFormContainerProps {
  setFilter: (obj: IObjForAction) => void;
  filterProperties: FilterPropertiesType[];
  filterType: FilterTypeEnum;
}

export const FilterFormContainer: React.FC<IFilterFormContainerProps> = (
  props,
) => {
  const { setFilter, filterProperties, filterType } = props;
  const dispatch = useDispatch();

  const initLocalState = filterProperties.reduce(
    (acc: ICheckboxes, next: FilterPropertiesType) => {
      return { ...acc, [next.id.toString()]: true };
    },
    {},
  );

  const initNamesState = filterProperties.map((type) => type.name);

  const [checked, setChecked] = React.useState<ICheckboxes>(initLocalState);
  const [allChecked, setAllChecked] = React.useState<boolean>(true);
  const [checkedNames, setCheckedNames] = React.useState<string[]>(
    initNamesState,
  );

  const filterTitle =
    filterType === FilterTypeEnum.REGIONS ? 'Регіони:' : 'Напрямки:';

  useEffect(() => {
    return () => {
      dispatch(
        setFilter({
          value: {},
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (Object.values(checked).every((elem) => elem)) {
      setAllChecked(true);
    }
  }, [checked]);

  const setFilterWithDebounce = useCallback(
    _.debounce((checkedTypes: ICheckboxes) => {
      dispatch(
        setFilter({
          value: checkedTypes,
        }),
      );
    }, 500),
    [],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string,
  ) => {
    const checkedTypes = {
      ...checked,
      [event.target.id]: event.target.checked,
    };

    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    const newCheckedNames = event.target.checked
      ? [...checkedNames, typeName]
      : checkedNames.filter((name) => name !== typeName);

    setChecked(checkedTypes);
    setCheckedNames(newCheckedNames);
    setFilterWithDebounce(checkedTypes);
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = event.target.checked
      ? _.mapValues(checked, () => true)
      : _.mapValues(checked, () => false);

    const newCheckedNames = event.target.checked
      ? filterProperties.map((type) => type.name)
      : [];

    setChecked(checkedTypes);
    setAllChecked(event.target.checked);
    setCheckedNames(newCheckedNames);
    setFilterWithDebounce(checkedTypes);
  };

  const checkedNamesString = () => {
    if (allChecked) {
      return 'Всі';
    }
    if (checkedNames.length < 4) {
      return checkedNames.join(', ');
    }
    return `${checkedNames.slice(0, 3).join(', ')} + ${
      checkedNames.length - 3
    }`;
  };

  return (
    <>
      <FilterForm
        filterProperties={filterProperties}
        filterTitle={filterTitle}
        checkedNamesString={checkedNamesString}
        allChecked={allChecked}
        checked={checked}
        onCheckboxAllChange={handleChangeAll}
        onCheckboxChange={handleChange}
      />
    </>
  );
};
