import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMatirealsAction,
  selectAdminlab,
  selectMeta,
  setStateToInit,
} from 'models/adminlab';
import { useStyles } from './styles/MaterailsTable.styles';
import MaterailsTableHead from './MaterialsTableHead';
import MaterailsTableBody from './MaterialsTableBody';
import MaterialsTableFilters from './MaterialsTableFilters';
import MaterialsTablePagination from './MaterialsTablePagination';

const MaterailsTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector(selectAdminlab);
  const { sort, filters, page } = useSelector(selectMeta);

  useEffect(
    () => () => {
      dispatch(setStateToInit());
    },
    [],
  );

  useEffect(() => {
    dispatch(getMatirealsAction());
  }, [filters, sort, page]);

  return (
    <TableContainer>
      <MaterialsTableFilters />
      <Paper>
        <Table className={classes.table}>
          <MaterailsTableHead />
          <MaterailsTableBody />
        </Table>
      </Paper>
      {totalPages > 1 && <MaterialsTablePagination />}
    </TableContainer>
  );
};

export default MaterailsTable;
