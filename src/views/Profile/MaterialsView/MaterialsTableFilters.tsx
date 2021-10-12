import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { QueryTypeEnum } from 'old/lib/types';
import {
  selectDirections,
  selectOrigins,
  selectPostTypes,
} from '../../../models/properties';
import { selectMeta } from '../../../models/adminlab';
import { MaterialsFilter } from './MaterialsFilter';

const MaterialsTableFilters: React.FC = () => {
  const allDirections = useSelector(selectDirections);
  const allOrigins = useSelector(selectOrigins);
  const allPostTypes = useSelector(selectPostTypes);
  const { filters } = useSelector(selectMeta);

  return (
    <Grid container direction="row">
      <Grid item direction="column" xs={5} sm={4} md={3} lg={1}>
        <MaterialsFilter
          allOptions={allDirections}
          selected={filters.directions}
          filter={QueryTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={1}>
        <MaterialsFilter
          allOptions={allOrigins}
          selected={filters.origins}
          filter={QueryTypeEnum.ORIGINS}
        />
      </Grid>
      <Grid item direction="column" xs={5} sm={4} md={3} lg={1}>
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
