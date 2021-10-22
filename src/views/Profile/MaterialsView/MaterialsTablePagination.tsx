import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectMeta, selectAdminlab, setPage } from 'models/adminlab';
import { useActions } from '../../../shared/hooks';

import { useStyles } from './styles/MaterialsTablePagination.styles';

const MaterialsTablePagination: React.FC = () => {
  const [boundedSetPage] = useActions([setPage]);
  const { size, page } = useSelector(selectMeta);
  const { totalPages } = useSelector(selectAdminlab);
  const classes = useStyles(selectAdminlab);

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

export default MaterialsTablePagination;
