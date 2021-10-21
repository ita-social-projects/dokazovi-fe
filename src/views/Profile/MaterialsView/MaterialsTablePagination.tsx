import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeta, setPage } from 'models/adminlab';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './styles/MaterialsTablePagination.styles';

const MaterialsTablePagination: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useSelector(selectMeta);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage({ page: value }));
  };

  return (
    <Pagination
      className={classes.root}
      count={75}
      page={page}
      onChange={handleChangePage}
    />
  );
};

export default MaterialsTablePagination;
