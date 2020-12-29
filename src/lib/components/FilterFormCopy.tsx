import React, { useCallback, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import type { RootStateType } from '../../store/rootReducer';
import {
  ExpertPropertiesType,
  FilterTypeEnum,
  IDirection,
  IPostType,
} from '../types';
import { setExpertsRegionsFilter } from '../../modules/experts/store/expertsSlice';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IObjForAction {
  value: ICheckboxes;
}

export interface IFilterFormProps {
  setExpertsListFilter: (obj: IObjForAction) => void;
  expertsProperties: IPostType[];
  filterType: FilterTypeEnum;
}

export const FilterForm: React.FC<IFilterFormProps> = (props) => {
  const { setExpertsListFilter, expertsProperties, filterType } = props;
  const dispatch = useDispatch();
  //   (state: RootStateType) => state.properties?.regions,
  // );

  const initLocalState = expertsProperties.reduce(
    (acc: ICheckboxes, next: ExpertPropertiesType) => {
      return { ...acc, [next.id.toString()]: true };
    },
    {},
  );

  const [checked, setChecked] = React.useState<ICheckboxes>(initLocalState);
  const [allChecked, setAllChecked] = React.useState<boolean>(true);

  const filterTitle =
    filterType === FilterTypeEnum.REGIONS ? 'Регіони:' : 'Напрямки:';

  useEffect(() => {
    return () => {
      dispatch(
        setExpertsListFilter({
          value: {},
        }),
      );
    };
  }, []);

  const setExpertsFilter = useCallback(
    _.debounce((checkedTypes) => {
      dispatch(
        setExpertsListFilter({
          value: checkedTypes as ICheckboxes,
        }),
      );
    }, 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = {
      ...checked,
      [event.target.id]: event.target.checked,
    };

    setChecked(checkedTypes);
    setExpertsFilter(checkedTypes);
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = event.target.checked
      ? _.mapValues(checked, () => true)
      : _.mapValues(checked, () => false);

    setChecked(checkedTypes);
    setAllChecked(event.target.checked);
    setExpertsFilter(checkedTypes);
  };

  return (
    <>
      <Grid container style={{ paddingLeft: '30px', marginTop: '20px' }}>
        <Grid item xs={2} style={{ marginRight: '-30px' }}>
          <Typography variant="h5">{filterTitle}</Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            style={{ width: '100%' }}
            control={
              <Checkbox
                id="All"
                checked={allChecked}
                onChange={handleChangeAll}
                name="All"
              />
            }
            label="Всі"
            key="All"
          />
        </Grid>
        <Grid item xs={2} style={{ marginRight: '-30px' }} />
        <FormGroup
          style={{
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          {expertsProperties.map((type) => (
            <FormControlLabel
              style={{ width: '100%' }}
              control={
                <Checkbox
                  id={type.id.toString()}
                  checked={checked[type.id.toString()]}
                  onChange={handleChange}
                  name={type.name}
                />
              }
              label={type.name}
              key={type.name}
            />
          ))}
        </FormGroup>{' '}
      </Grid>
    </>
  );
};
