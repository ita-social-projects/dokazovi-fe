import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectMeta, selectAdminLab, setPage } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/AdminTablePagination.styles';

const AdminTablePagination: React.FC = () => {
  const [boundedSetPage] = useActions([setPage]);
  const { page } = useSelector(selectMeta);
  const { totalPages } = useSelector(selectAdminLab);
  const classes = useStyles(selectAdminLab);

  const onPageChangeEvent = (_, value: number) => {
    boundedSetPage({ page: value - 1 });
  };

  return (
    <Pagination
      className={classes.root}
      count={totalPages}
      page={page + 1}
      onChange={onPageChangeEvent}
    />
  );
};

export default AdminTablePagination;
