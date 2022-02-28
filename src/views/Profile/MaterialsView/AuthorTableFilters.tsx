import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { QueryTypeEnum } from '../../../old/lib/types';
import { FieldEnum } from '../../../models/adminLab/types';
import {
  selectDirections,
  selectPostTypes,
  selectPostStatuses,
} from '../../../models/properties';
import {
  selectMeta,
  setFiltersToInit,
  setFilter,
  setField,
  setDate,
} from '../../../models/adminLab';
import { AdminFilter } from '../AdminTable/AdminFilter';
import { AdminDatePicker } from '../AdminTable/AdminDatePicker';
import { AdminTextField } from '../AdminTable/AdminTextField';
import { useStyles } from '../AdminTable/styles/AdminTableFilters.styles';
import { useActions } from '../../../shared/hooks';

export const AuthorTableFilters: React.FC = () => {
  const [
    boundedSetFilter,
    boundedSetField,
    boundedSetFiltersToInit,
    boundedSetDate,
  ] = useActions([setFilter, setField, setFiltersToInit, setDate]);

  const allDirections = useSelector(selectDirections);
  const allPostTypes = useSelector(selectPostTypes);
  const allPostStatuses = useSelector(selectPostStatuses);
  const { filters, date } = useSelector(selectMeta);

  const classes = useStyles();

  return (
    <Grid className={classes.filterSection} container direction="row">
      <Grid item>
        <IconButton
          onClick={boundedSetFiltersToInit}
          className={classes.clearButton}
        >
          <HighlightOffRoundedIcon fontSize="large" />
        </IconButton>
      </Grid>
      {/* <Grid item>
        <AdminFilter
          setChanges={boundedSetFilter}
          allOptions={allDirections}
          selected={filters.directions}
          filter={QueryTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid item>
        <AdminFilter
          setChanges={boundedSetFilter}
          allOptions={allPostStatuses}
          selected={filters.statuses}
          filter={QueryTypeEnum.STATUSES}
        />
      </Grid>
      <Grid item md={3}>
        <AdminDatePicker
          start={date.start}
          end={date.end}
          setChanges={boundedSetDate}
        />
      </Grid> */}
      <Grid item>
        <AdminFilter
          setChanges={boundedSetFilter}
          allOptions={allPostTypes}
          selected={filters.types}
          filter={QueryTypeEnum.POST_TYPES}
        />
      </Grid>
      <Grid item md={2}>
        <AdminTextField field={FieldEnum.TITLE} setChanges={boundedSetField} />
      </Grid>
      <Grid item md={2}>
        <AdminTextField field={FieldEnum.AUTHOR} setChanges={boundedSetField} />
      </Grid>
    </Grid>
  );
};
