import React, { useEffect, useState } from 'react';
import { isEmpty, mapValues } from 'lodash';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { store } from '../../../../models/store';
import { useStyles } from './CheckboxLeftsideFilterForm.styles';
import { FilterItemsList } from '../FilterItems/FilterItemsList';
import { CheckboxFormStateType } from './CheckboxFilterForm';
import { IDirection, IPostType, QueryTypeEnum } from '../../types';

interface IFilter {
  id: string | number;
  name: string;
  label?: string;
}

export interface ICheckboxLeftsideFilterFormProps {
  onFormChange: (checked: CheckboxFormStateType) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
  filterTitle: string;
  allTitle: string;
  handleDelete?: () => void;
  expertId?: number;
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
  const [toggleInitialState, setToggleInitialState] = useState(true);
  const isInitialStateEmpty = isEmpty(selectedFilters) && toggleInitialState;
  const classes = useStyles();
  const [allChecked, setAllChecked] = useState(true);
  const getCheckedStateFromFilters = (): CheckboxFormStateType => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] =
        isInitialStateEmpty ||
        Boolean(selectedFilters?.find((filter) => filter.id === next.id));
      return acc;
    }, {});
  };
  const [checked, setChecked] = useState<CheckboxFormStateType>(
    getCheckedStateFromFilters(),
  );

  useEffect(() => {
    if (
      isInitialStateEmpty ||
      selectedFilters?.length === possibleFilters.length
    ) {
      setAllChecked(true);
    } else if (
      disabledCheckBoxesIds?.length &&
      selectedFilters?.length ===
        possibleFilters.length - disabledCheckBoxesIds?.length
    ) {
      setAllChecked(true);
      if (!toggleInitialState) {
        setToggleInitialState(true);
      }
      const checkedFilters = mapValues(checked, () => true);

      setChecked(checkedFilters);
      onFormChange(checkedFilters);
    } else if (allChecked) {
      setAllChecked(false);
    }

    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  useEffect(() => {
    if (selectedFilters?.length === 1) {
      setToggleInitialState(false);
    } else if (selectedFilters?.length === possibleFilters.length - 1) {
      setToggleInitialState(true);
    }
  }, [selectedFilters]);

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    let result = { ...checked };

    if (disabledCheckBoxesIds?.length) {
      const resultWithoutDisabled = { ...checked };
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < disabledCheckBoxesIds.length; i++) {
        resultWithoutDisabled[+disabledCheckBoxesIds[i]] = false;
      }

      result = { ...resultWithoutDisabled };
    }

    onFormChange({
      ...result,
      [event.target.name]: event.target.checked,
    });
  };
  const onCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!toggleInitialState && event.target.checked) {
      setToggleInitialState(true);
    } else if (toggleInitialState && !event.target.checked) {
      setToggleInitialState(false);
    }

    const checkedFilters = event.target.checked
      ? mapValues(checked, () => true)
      : mapValues(checked, () => false);

    setAllChecked(event.target.checked);
    setChecked(checkedFilters);
    onFormChange(checkedFilters);
  };

  const getUsersPresentProperty = (filterName: string | undefined) => {
    const allRegions = store.getState().properties.regions;
    let result: boolean | undefined = false;
    if (filterType === QueryTypeEnum.REGIONS) {
      const region = allRegions.find((reg) => reg.name === filterName);
      result = region?.usersPresent;
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

  const getHasMaterialsProperty = (filterName: string | undefined) => {
    let result: boolean | undefined = false;

    if (filterType === QueryTypeEnum.DIRECTIONS) {
      const allDirections = store.getState().properties.directions;
      const direction = allDirections.find((dir) => dir.name === filterName);
      result = direction?.hasPosts;
    }

    return result;
  };

  useEffect(() => {
    const arrOfDisabled = [
      ...possibleFilters.filter(
        (filter) =>
          (filterType === QueryTypeEnum.REGIONS &&
            !getUsersPresentProperty(filter.name)) ||
          checkWhetherDisabledDirection(filter.name) ||
          checkWhetherDisabledPostType(Number(filter.id)),
      ),
    ];
    const arrOfDisabledIds: number[] = arrOfDisabled.map((el) => +el.id);

    setDisabledCheckBoxesIds(arrOfDisabledIds);
  }, [disabledPostTypes, disabledDirections]);

  let theOnlyAvailableFilter = false;
  if (
    disabledCheckBoxesIds &&
    possibleFilters.length - disabledCheckBoxesIds.length === 1
  ) {
    theOnlyAvailableFilter = true;
  }

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
    let disabledDirectionItem = false;

    if (disabledDirections?.length) {
      disabledDirectionItem = checkWhetherDisabledDirection(filterName);
    }

    let disabledPostTypeItem = false;
    if (disabledPostTypes?.length) {
      disabledPostTypeItem = checkWhetherDisabledPostType(+id);
    }

    if (
      filterType === QueryTypeEnum.DIRECTIONS &&
      !getHasMaterialsProperty(filterName)
    ) {
      return null;
    }

    const disabledFilter =
      disabledRegionItem || disabledDirectionItem || disabledPostTypeItem;

    return (
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
    );
  });

  return (
    <Box mt={2} className={classes.filtersWrapper}>
      <Grid container>
        <Grid item>
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
                style={
                  theOnlyAvailableFilter
                    ? { fontWeight: 500, color: '#767676' }
                    : { fontWeight: 700 }
                }
              >
                {allTitle}
              </Typography>
            }
            key="All"
          />
          {checkBoxes}
        </FormGroup>
      </Grid>
    </Box>
  );
};
