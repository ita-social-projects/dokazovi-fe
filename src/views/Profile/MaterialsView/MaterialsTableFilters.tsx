import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, IconButton } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { QueryTypeEnum } from 'old/lib/types';
import {
  selectDirections,
  selectOrigins,
  selectPostTypes,
} from '../../../models/properties';
import { selectMeta, setFiltersToInit } from '../../../models/adminlab';
import { MaterialsFilter } from './MaterialsFilter';
import { useStyles } from './styles/MaterialsTableFilters.styles';

const MaterialsTableFilters: React.FC = () => {
  const dispatch = useDispatch();

  const allDirections = useSelector(selectDirections);
  const allOrigins = useSelector(selectOrigins);
  const allPostTypes = useSelector(selectPostTypes);
  const { filters } = useSelector(selectMeta);

  const classes = useStyles();

  const onClearIconClick = () => {
    dispatch(setFiltersToInit());
  };

  return (
    <Grid className={classes.filterSrction} container direction="row">
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <IconButton
          onClick={onClearIconClick}
          color="primary"
          className={classes.clearButton}
        >
          <HighlightOffRoundedIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          allOptions={allDirections}
          selected={filters.directions}
          filter={QueryTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          allOptions={allOrigins}
          selected={filters.origins}
          filter={QueryTypeEnum.ORIGINS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={2}>
        <MaterialsFilter
          allOptions={allPostTypes}
          selected={filters.types}
          filter={QueryTypeEnum.POST_TYPES}
        />
      </Grid>
    </Grid>
  );
};

export default MaterialsTableFilters;
