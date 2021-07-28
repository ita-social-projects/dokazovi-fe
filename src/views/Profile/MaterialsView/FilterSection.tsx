import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { useStyles } from '../../../old/lib/components/Filters/CheckboxLeftsideFilterForm.styles';
import { FilterConfigType } from '../../../models/materials/types';

export interface IFilterSectionProps {
  onFormChange: (change: boolean | FilterConfigType) => void;
  title: string;
  isAllFiltersChecked: boolean;
  filters: FilterConfigType[];
}

export const FilterSection: React.FC<IFilterSectionProps> = ({
  onFormChange,
  title,
  isAllFiltersChecked,
  filters,
}) => {
  const classes = useStyles();

  const checkBoxes = filters.map(({ id, name, checked }) => {
    return (
      <FormControlLabel
        key={id}
        className={
          isAllFiltersChecked && checked !== null
            ? classes.labelChecked
            : classes.labelUnchecked
        }
        label={name}
        control={
          <Checkbox
            checked={checked ?? false}
            onChange={() =>
              onFormChange({
                id,
                name,
                checked: checked !== null ? !checked : null,
              })
            }
            name={id}
            disabled={checked === null}
            icon={<span className={classes.icon} />}
            checkedIcon={<span className={classes.checkedIcon} />}
          />
        }
      />
    );
  });

  return (
    <Box
      mt={1}
      style={{
        width: '180px',
        padding: '25px',
        margin: '0px',
      }}
      className={classes.filtersWrapper}
    >
      <Grid container>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            style={{ width: '160px' }}
            className={classes.formControlLabel}
            control={
              <Checkbox
                id="All"
                checked={isAllFiltersChecked}
                onChange={() => onFormChange(!isAllFiltersChecked)}
                name="All"
                icon={<span className={classes.icon} />}
                checkedIcon={<span className={classes.checkedIcon} />}
              />
            }
            label={
              <Typography className={classes.allCheckedTrue}>
                {title}
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
