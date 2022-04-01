import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import i18, { langTokens } from '../../../locales/localizationInit';
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
import { AdminFilter } from './AdminFilter';
import { AdminDatePicker } from './AdminDatePicker';
import { AdminTextField } from './AdminTextField';
import { useStyles } from './styles/AdminTableFilters.styles';
import { useActions } from '../../../shared/hooks';

const AdminTableFilters: React.FC = () => {
  const [
    boundedSetFilter,
    boundedSetField,
    boundedSetFiltersToInit,
    boundedSetDate,
  ] = useActions([setFilter, setField, setFiltersToInit, setDate]);

  const allDirections = useSelector(selectDirections);
  const allPostTypes = useSelector(selectPostTypes);
  const allPostStatuses = useSelector(selectPostStatuses);
  const { filters, date, textFields } = useSelector(selectMeta);

  const resetFilters = () => {
    boundedSetFiltersToInit();
  };

  const classes = useStyles();

  return (
    <Grid className={classes.filterSection} container direction="row">
      <Grid item>
        <Tooltip
          title="Скинути всі фільтри"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton onClick={resetFilters} className={classes.clearButton}>
            <HighlightOffRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
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
      </Grid>
      <Grid item>
        <AdminFilter
          setChanges={boundedSetFilter}
          allOptions={allPostTypes}
          selected={filters.types}
          filter={QueryTypeEnum.POST_TYPES}
        />
      </Grid>
      <Grid item md={2}>
        <AdminTextField
          field={FieldEnum.TITLE}
          placeholder={i18.t(langTokens.admin.searchTitlePlaceholder)}
          setChanges={boundedSetField}
        />
      </Grid>
      <Grid item md={2}>
        <AdminTextField
          field={FieldEnum.AUTHOR}
          placeholder={i18.t(langTokens.admin.searchAuthorPlaceholder)}
          setChanges={boundedSetField}
        />
      </Grid>
    </Grid>
  );
};

export default AdminTableFilters;
