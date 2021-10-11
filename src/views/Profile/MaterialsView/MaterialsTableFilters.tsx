import React from 'react';
import { useSelector } from 'react-redux';

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
    <div>
      <MaterialsFilter
        allOptions={allDirections}
        selected={filters.directions}
        filter={QueryTypeEnum.DIRECTIONS}
      />
      <MaterialsFilter
        allOptions={allOrigins}
        selected={filters.origins}
        filter={QueryTypeEnum.ORIGINS}
      />
      <MaterialsFilter
        allOptions={allPostTypes}
        selected={filters.types}
        filter={QueryTypeEnum.POST_TYPES}
      />
    </div>
  );
};

export default MaterialsTableFilters;
