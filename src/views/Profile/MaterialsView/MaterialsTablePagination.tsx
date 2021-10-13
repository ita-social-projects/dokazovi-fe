import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './styles/MaterialsTablePagination.styles';

const MaterialsTablePagination: React.FC = () => {
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      count={75}
      page={1}
      onChange={() => console.log('click')}
    />
  );
};

export default MaterialsTablePagination;
