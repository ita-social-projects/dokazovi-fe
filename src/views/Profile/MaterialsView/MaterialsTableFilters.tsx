import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { QueryTypeEnum } from 'old/lib/types';
import { FieldEnum } from '../../../models/adminLab/types';
import {
  selectDirections,
  selectOrigins,
  selectPostTypes,
} from '../../../models/properties';
import {
  selectMeta,
  setFiltersToInit,
  setFilter,
  setField,
} from '../../../models/adminLab';
import { MaterialsFilter } from './MaterialsFilter';
import { MaterialsTextField } from './MaterialsTextField';
import { useStyles } from './styles/MaterialsTableFilters.styles';
import { useActions } from '../../../shared/hooks';

const MaterialsTableFilters: React.FC = () => {
  const [
    boundedSetFilter,
    boundedSetField,
    boundedSetFiltersToInit,
  ] = useActions([setFilter, setField, setFiltersToInit]);

  const allDirections = useSelector(selectDirections);
  const allOrigins = useSelector(selectOrigins);
  const allPostTypes = useSelector(selectPostTypes);
  const { filters, textFields } = useSelector(selectMeta);

  const classes = useStyles();

  return (
    <Grid className={classes.filterSection} container direction="row">
      <IconButton
        onClick={boundedSetFiltersToInit}
        color="primary"
        className={classes.clearButton}
      >
        <HighlightOffRoundedIcon fontSize="large" />
      </IconButton>

      <Grid item direction="column">
        <MaterialsFilter
          setChanges={boundedSetFilter}
          allOptions={allDirections}
          selected={filters.directions}
          filter={QueryTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid item direction="column">
        <MaterialsFilter
          setChanges={boundedSetFilter}
          allOptions={allOrigins}
          selected={filters.origins}
          filter={QueryTypeEnum.ORIGINS}
        />
      </Grid>
      <Grid item direction="column">
        <MaterialsFilter
          setChanges={boundedSetFilter}
          allOptions={allPostTypes}
          selected={filters.types}
          filter={QueryTypeEnum.POST_TYPES}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsTextField
          value={textFields.author}
          field={FieldEnum.AUTHOR}
          setChanges={boundedSetField}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsTextField
          value={textFields.title}
          field={FieldEnum.TITLE}
          setChanges={boundedSetField}
        />
      </Grid>
    </Grid>
  );
};

export default MaterialsTableFilters;
