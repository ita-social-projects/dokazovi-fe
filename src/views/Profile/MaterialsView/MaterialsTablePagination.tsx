import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminlab, selectMeta, setPage } from 'models/adminlab';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './styles/MaterialsTablePagination.styles';

const MaterialsTablePagination: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector(selectAdminlab);
  const { page } = useSelector(selectMeta);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage({ page: value - 1 }));
  };

  return (
    <Pagination
      className={classes.root}
      count={totalPages}
      page={page + 1}
      onChange={handleChangePage}
    />
  );
};

export default MaterialsTablePagination;
