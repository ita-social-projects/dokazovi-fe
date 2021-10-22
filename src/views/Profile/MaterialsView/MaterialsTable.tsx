import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMaterialsAction,
  selectAdminlab,
  selectMeta,
  setStateToInit,
} from 'models/adminlab';
import { useStyles } from './styles/MaterialsTable.styles';
import MaterialsTableHead from './MaterialsTableHead';
import MaterialsTableBody from './MaterialsTableBody';
import MaterialsTableFilters from './MaterialsTableFilters';
import MaterialsTablePagination from './MaterialsTablePagination';

const MaterialsTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector(selectAdminlab);
  const { sort, filters, page, size } = useSelector(selectMeta);

  useEffect(
    () => () => {
      dispatch(setStateToInit());
    },
    [],
  );

  useEffect(() => {
    dispatch(getMaterialsAction());
  }, [filters, sort, page, size]);

  return (
    <TableContainer>
      <MaterialsTableFilters />
      <Paper>
        <Table className={classes.table}>
          <MaterialsTableHead />
          <MaterialsTableBody />
        </Table>
      </Paper>
      {totalPages > 1 && <MaterialsTablePagination />}
    </TableContainer>
  );
};

export default MaterialsTable;
