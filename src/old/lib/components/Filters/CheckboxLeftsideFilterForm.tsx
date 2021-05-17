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
import { store } from '../../../store/store';
import { useStyles } from './CheckboxLeftsideFilterForm.styles';
import FilterItemsList from '../FilterItems/FilterItemsList';
import { CheckboxFormStateType } from './CheckboxFilterForm';

interface IFilter {
  id: string | number;
  name: string;
}

export interface ICheckboxLeftsideFilterFormProps {
  onFormChange: (checked: CheckboxFormStateType) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
  filterTitle: string;
  allTitle: string;
  handleDelete?: () => void;
}

export const CheckboxLeftsideFilterForm: React.FC<ICheckboxLeftsideFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
  filterTitle,
  allTitle,
}) => {
  const isInitialStateEmpty = isEmpty(selectedFilters);
  const classes = useStyles();

  const getCheckedStateFromFilters = (): CheckboxFormStateType => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] =
        isInitialStateEmpty ||
        Boolean(selectedFilters?.find((filter) => filter.id === next.id));
      return acc;
    }, {});
  };

  const [allChecked, setAllChecked] = useState(isInitialStateEmpty);
  const [checked, setChecked] = useState<CheckboxFormStateType>(
    getCheckedStateFromFilters(),
  );

  // console.log(checked);

  const [regionItem, setRegionItem] = useState(false);

  useEffect(() => {
    if (
      selectedFilters === undefined ||
      selectedFilters?.length === possibleFilters.length
    ) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    onFormChange({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const onCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (allRegions.find((dir) => dir.name === filterName)) {
      if (regionItem === false) {
        setRegionItem(true);
      }
      const region = allRegions.find((dir) => dir.name === filterName);
      result = region?.usersPresent;
    }

    return result;
  };

  // console.log("123");

  const checkBoxes = possibleFilters.map((filter) => {
    const id = filter.id.toString();
    const filterName = filter.name;
    const disabled = !getUsersPresentProperty(filterName);

    return (
      <FormControlLabel
        key={id}
        className={classes.formControlLabel}
        label={
          <FilterItemsList
            checkedNames={filter.name}
            isEnabledRegion={regionItem && !disabled}
          />
        }
        control={
          <Checkbox
            checked={regionItem && disabled ? false : checked[id]}
            onChange={(event) => onCheckboxCheck(event)}
            name={id}
            disabled={regionItem && disabled}
            icon={<span className={classes.icon} />}
            checkedIcon={<span className={classes.checkedIcon} />}
          />
        }
      />
    );
  });

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item style={{ marginLeft: '15px' }}>
          <Typography
            variant="h5"
            style={{
              fontFamily: 'Raleway',
              fontStyle: 'normal',
              width: '265px',
              fontSize: '18px',
              lineHeight: '18px',
              fontWeight: 'bold',
            }}
          >
            {filterTitle}
          </Typography>
          <div
            style={{
              width: '280px',
              height: '4px',
              background: '#000000',
              margin: '2px 0 20px 0',
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <FormGroup
          style={{
            margin: '0 0 75px 15px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <FormControlLabel
            style={{ width: '100%' }}
            className={classes.formControlLabel}
            control={
              <Checkbox
                id="All"
                checked={allChecked}
                onChange={onCheckboxAllChange}
                name="All"
                icon={<span className={classes.icon} />}
                checkedIcon={<span className={classes.checkedIcon} />}
              />
            }
            label={
              <Typography
                style={{
                  fontFamily: 'Raleway',
                  fontStyle: 'normal',
                  fontSize: '16px',
                  lineHeight: '18px',
                  fontWeight: 700,
                  color: '#000000',
                }}
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
