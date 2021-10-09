import React, { useEffect } from 'react';
import { Table, TableContainer } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getMatirealsAction } from 'models/adminlab';
import { SortBy, Order } from 'models/adminlab/types';
import { useStyles } from './styles/MaterailsTable.styles';
import MaterailsTableHead from './MaterialsTableHead';
import MaterailsTableBody from './MaterialsTableBody';
import MaterialsTableFilters from './MaterialsTableFilters';
import MaterialsTablePagination from './MaterialsTablePagination';

const MaterailsTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMatirealsAction({
        sortBy: SortBy.post_id,
        order: Order.desc,
        filters: {},
      }),
    );
  }, []);

  return (
    <TableContainer>
      <MaterialsTableFilters />
      <Table className={classes.table}>
        <MaterailsTableHead />
        <MaterailsTableBody />
      </Table>
      <MaterialsTablePagination />
    </TableContainer>
  );
};

export default MaterailsTable;
