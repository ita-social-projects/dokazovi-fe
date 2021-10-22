import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { QueryTypeEnum } from 'old/lib/types';
import { IFilter } from '../../../models/adminlab/types';
import {
  selectDirections,
  selectOrigins,
  selectPostTypes,
} from '../../../models/properties';
import {
  selectMeta,
  setFiltersToInit,
  setFilter,
} from '../../../models/adminlab';
import { MaterialsFilter } from './MaterialsFilter';
import { useStyles } from './styles/MaterialsTableFilters.styles';
import { useActions } from '../../../shared/hooks';

const MaterialsTableFilters: React.FC = () => {
  const [boundedSetFilter] = useActions([setFilter]);
  const dispatch = useDispatch();

  const allDirections = useSelector(selectDirections);
  const allOrigins = useSelector(selectOrigins);
  const allPostTypes = useSelector(selectPostTypes);
  const { filters } = useSelector(selectMeta);

  const classes = useStyles();

  const onClearIconClick = () => {
    dispatch(setFiltersToInit());
  };

  const onFilterChange = (payload: IFilter) => {
    boundedSetFilter(payload);
  };

  return (
    <Grid className={classes.filterSection} container direction="row">
      <IconButton
        onClick={onClearIconClick}
        color="primary"
        className={classes.clearButton}
      >
        <HighlightOffRoundedIcon fontSize="large" />
      </IconButton>

      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          setChanges={onFilterChange}
          allOptions={allDirections}
          selected={filters.directions}
          filter={QueryTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          setChanges={onFilterChange}
          allOptions={allOrigins}
          selected={filters.origins}
          filter={QueryTypeEnum.ORIGINS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          setChanges={onFilterChange}
          allOptions={allPostTypes}
          selected={filters.types}
          filter={QueryTypeEnum.POST_TYPES}
        />
      </Grid>
    </Grid>
  );
};

export default MaterialsTableFilters;
