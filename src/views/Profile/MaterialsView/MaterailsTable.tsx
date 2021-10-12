import React, { useEffect } from 'react';
import { Table, TableContainer } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMatirealsAction,
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
      <Table className={classes.table}>
        <MaterailsTableHead />
        <MaterailsTableBody />
      </Table>
      <MaterialsTablePagination />
    </TableContainer>
  );
};

export default MaterailsTable;
