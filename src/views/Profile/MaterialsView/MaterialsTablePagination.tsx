import React from 'react';
import { useDispatch } from 'react-redux';

import { incrementPage, decrementPage, setPage } from 'models/adminlab';

const style = {
  margin: '0 50',
};

const MaterialsTablePagination: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        style={style}
        onClick={() => dispatch(incrementPage())}
      >
        +1
      </button>
      <button
        type="button"
        style={style}
        onClick={() => dispatch(setPage({ page: 4 }))}
      >
        set 4
      </button>
      <button
        type="button"
        style={style}
        onClick={() => dispatch(decrementPage())}
      >
        -1
      </button>
    </div>
  );
};

export default MaterialsTablePagination;
