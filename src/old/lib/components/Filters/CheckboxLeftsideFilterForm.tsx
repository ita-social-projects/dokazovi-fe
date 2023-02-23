import React, { useEffect, useState, useContext } from 'react';
import { mapValues } from 'lodash';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import { store } from '../../../../models/store';
import { useStyles } from './CheckboxLeftsideFilterForm.styles';
import { FilterItemsList } from '../FilterItems/FilterItemsList';
import { CheckboxFormStateType } from './CheckboxFilterForm';
import {
  IDirection,
  IPostType,
  QueryTypeEnum,
  filtersStateEnum,
} from '../../types';

interface IFilter {
  id: string | number;
  name: string;
  label?: string;
}

export interface ICheckboxLeftsideFilterFormProps {
  onFormChange: (
    checked: CheckboxFormStateType,
    disabled?: CheckboxFormStateType,
  ) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[] | filtersStateEnum;
  filterTitle: string;
  allTitle: string;
  disabledDirections?: IDirection[] | undefined;
  disabledPostTypes?: IPostType[] | undefined;
  setTheOnlyAvailableFilter?: (name: string) => void;
  filterType: QueryTypeEnum;
}

export const CheckboxLeftsideFilterForm: React.FC<ICheckboxLeftsideFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
  filterTitle,
  allTitle,
  disabledDirections,
  disabledPostTypes,
  setTheOnlyAvailableFilter,
  filterType,
}) => {
  const [disabledCheckBoxesIds, setDisabledCheckBoxesIds] = useState<
    number[]
  >();
  const { mobile } = useContext(ScreenContext);
  const classes = useStyles();
  const [allChecked, setAllChecked] = useState(true);

  const getCheckedStateFromFilters = (): CheckboxFormStateType => {
    if (typeof selectedFilters !== 'string') {
      return possibleFilters.reduce((acc, next) => {
        acc[next.id] = Boolean(
          selectedFilters?.find((filter) => filter.id === next.id),
        );
        return acc;
      }, {});
    }
    if (selectedFilters === filtersStateEnum.empty) {
      return possibleFilters.reduce((acc, next) => {
        acc[next.id] = false;
        return acc;
      }, {});
    }
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] = true;
      return acc;
    }, {});
  };
  const [checked, setChecked] = useState<CheckboxFormStateType>(
    getCheckedStateFromFilters(),
  );

  useEffect(() => {
    if (selectedFilters === filtersStateEnum.empty) {
      setAllChecked(false);
    } else if (
      selectedFilters === filtersStateEnum.notEmpty ||
      (typeof selectedFilters !== 'string' &&
        selectedFilters?.length === possibleFilters.length)
    ) {
      setAllChecked(true);
    } else if (
      disabledCheckBoxesIds &&
      selectedFilters &&
      typeof selectedFilters !== 'string' &&
      selectedFilters.length <=
        possibleFilters.length - disabledCheckBoxesIds.length - 1
    ) {
      setAllChecked(false);
    }

    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  const getResultWithoutDisabled = () => {
    const resultWithoutDisabled = { ...checked };
    if (disabledCheckBoxesIds) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < disabledCheckBoxesIds.length; i++) {
        resultWithoutDisabled[+disabledCheckBoxesIds[i]] = false;
      }
    }
    return resultWithoutDisabled;
  };

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    let result = { ...checked };
    let disabled: CheckboxFormStateType | undefined;

    if (disabledCheckBoxesIds?.length) {
      if (
        selectedFilters &&
        event.target.checked &&
        selectedFilters.length + 1 ===
          possibleFilters.length - disabledCheckBoxesIds?.length
      ) {
        setAllChecked(true);
        const checkedFilters = mapValues(checked, () => true);

        setChecked(checkedFilters);
        result = { ...checkedFilters };
        disabled = { ...getResultWithoutDisabled() };
      } else {
        result = { ...getResultWithoutDisabled() };
      }
    }

    onFormChange(
      {
        ...result,
        [event.target.name]: event.target.checked,
      },
      disabled,
    );
  };

  const onCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedFilters = event.target.checked
      ? mapValues(checked, () => true)
      : mapValues(checked, () => false);

    setAllChecked(event.target.checked);
    setChecked(checkedFilters);
    onFormChange(checkedFilters);
  };

  const getUsersPresentProperty = (filterName: string | number | '') => {
    const allRegions = store.getState().properties.regions;
    const allDirections = store.getState().properties.directions;
    const allOrigins = store.getState().properties.origins;

    let result: boolean | undefined = false;

    if (filterType === QueryTypeEnum.REGIONS) {
      const region = allRegions.find((reg) => reg.name === filterName);
      result = region?.usersPresent;
    }

    if (filterType === QueryTypeEnum.DIRECTIONS) {
      const direction = allDirections.find((dir) => dir.name === filterName);
      result = direction?.hasPosts;
    }

    if (filterType === QueryTypeEnum.ORIGINS) {
      const originItem = allOrigins.map((origin) => origin.id);
      const filterNameValue = Number(filterName);
      result = originItem?.includes(filterNameValue);
    }

    return result;
  };

  const checkWhetherDisabledDirection = (filterName: string | undefined) => {
    if (disabledDirections?.length) {
      return !(
        disabledDirections.find((el) => el.name === filterName) === undefined
      );
    }
    return false;
  };

  const checkWhetherDisabledPostType = (id: number | undefined) => {
    if (disabledPostTypes?.length) {
      return !(disabledPostTypes.find((el) => el.id === id) === undefined);
    }
    return false;
  };

  useEffect(() => {
    const arrOfDisabled = [
      ...possibleFilters.filter(
        (filter) =>
          (filterType === QueryTypeEnum.REGIONS &&
            !getUsersPresentProperty(filter.name)) ||
          (filterType === QueryTypeEnum.DIRECTIONS &&
            !getUsersPresentProperty(filter.name)) ||
          (filterType === QueryTypeEnum.ORIGINS &&
            !getUsersPresentProperty(filter.id)) ||
          checkWhetherDisabledDirection(filter.name) ||
          checkWhetherDisabledPostType(Number(filter.id)),
      ),
    ];
    const arrOfDisabledIds: number[] = arrOfDisabled.map((el) => +el.id);

    setDisabledCheckBoxesIds(arrOfDisabledIds);
  }, [disabledPostTypes, disabledDirections]);

  const theOnlyAvailableFilter =
    !!disabledCheckBoxesIds &&
    (possibleFilters.length - disabledCheckBoxesIds.length === 0 ||
      possibleFilters.length - disabledCheckBoxesIds.length === 1);

  useEffect(() => {
    if (theOnlyAvailableFilter && setTheOnlyAvailableFilter) {
      possibleFilters.map((filter) => {
        const id = filter.id.toString();
        const filterName = filter.name;

        let disabledDirectionItem = false;
        if (disabledDirections?.length) {
          disabledDirectionItem = checkWhetherDisabledDirection(filterName);
        }

        let disabledPostTypeItem = false;
        if (disabledPostTypes?.length) {
          disabledPostTypeItem = checkWhetherDisabledPostType(Number(id));
        }

        if (!disabledPostTypeItem && disabledPostTypes?.length) {
          setTheOnlyAvailableFilter(filterName);
        }
        if (
          !disabledDirectionItem &&
          disabledDirections?.length &&
          filter.label
        ) {
          setTheOnlyAvailableFilter(filter.label);
        }

        return null;
      });
    }
  }, [theOnlyAvailableFilter]);

  const checkBoxes = possibleFilters.map((filter) => {
    const id = filter.id.toString();
    const filterName = filter.name;

    const disabledRegionItem =
      !getUsersPresentProperty(filterName) &&
      filterType === QueryTypeEnum.REGIONS;

    const disabledOriginItem =
      !getUsersPresentProperty(filter.id) &&
      filterType === QueryTypeEnum.ORIGINS;

    let disabledDirectionItem =
      !getUsersPresentProperty(filterName) &&
      filterType === QueryTypeEnum.DIRECTIONS;

    if (disabledDirections?.length) {
      disabledDirectionItem = checkWhetherDisabledDirection(filterName);
    }

    let disabledPostTypeItem = false;
    if (disabledPostTypes?.length) {
      disabledPostTypeItem = checkWhetherDisabledPostType(+id);
    }

    const disabledFilter =
      disabledRegionItem ||
      disabledDirectionItem ||
      disabledOriginItem ||
      disabledPostTypeItem;

    return (
      <>
        <FormControlLabel
          key={id}
          className={classes.formControlLabel}
          label={
            <FilterItemsList
              checkedNames={filter.name}
              isDisabledFilter={disabledFilter || theOnlyAvailableFilter}
              checked={disabledFilter ? false : checked[id]}
            />
          }
          control={
            <Checkbox
              checked={disabledFilter ? false : checked[id]}
              onChange={(event) => onCheckboxCheck(event)}
              name={id}
              disabled={disabledFilter || theOnlyAvailableFilter}
              icon={<span className={classes.icon} />}
              checkedIcon={<span className={classes.checkedIcon} />}
            />
          }
        />
        {mobile && <div className={classes.checkboxMobileDivider} />}
      </>
    );
  });

  return (
    <Box mt={2} className={classes.filtersWrapper}>
      <Grid container>
        <Grid item className={classes.titleWrapper}>
          <Typography variant="h5" className={classes.filterTitle}>
            {filterTitle}
          </Typography>
          <div className={classes.divider} />
        </Grid>
      </Grid>
      <Grid container>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            style={{ width: '100%' }}
            className={classes.formControlLabel}
            control={
              <Checkbox
                id="All"
                checked={allChecked}
                onChange={onCheckboxAllChange}
                name="All"
                disabled={theOnlyAvailableFilter}
                icon={<span className={classes.icon} />}
                checkedIcon={<span className={classes.checkedIcon} />}
              />
            }
            label={
              <Typography
                className={
                  allChecked ? classes.allCheckedTrue : classes.allCheckedFalse
                }
              >
                {allTitle}
              </Typography>
            }
            key="All"
          />
          {mobile && <div className={classes.checkboxMobileDivider} />}
          {checkBoxes}
        </FormGroup>
      </Grid>
    </Box>
  );
};
