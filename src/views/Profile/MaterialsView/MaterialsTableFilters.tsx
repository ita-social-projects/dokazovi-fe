import React from 'react';
import { useDispatch } from 'react-redux';

import { QueryTypeEnum } from 'old/lib/types';
import { setFilter } from '../../../models/adminlab';

const MaterialsTableFilters: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          dispatch(setFilter({ filter: QueryTypeEnum.DIRECTIONS, option: 1 }))
        }
      >
        sds{' '}
      </button>
    </div>
  );
};

export default MaterialsTableFilters;
