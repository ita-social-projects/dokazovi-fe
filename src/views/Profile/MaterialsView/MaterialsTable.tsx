import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  getMaterialsAction,
  selectAdminLab,
  selectMeta,
  setStateToInit,
} from 'models/adminLab';
import { useStyles } from './styles/MaterialsTable.styles';
import MaterialsTableHead from './MaterialsTableHead';
import MaterialsTableBody from './MaterialsTableBody';
import MaterialsTableFilters from './MaterialsTableFilters';
import MaterialsTablePagination from './MaterialsTablePagination';
import { useActions } from '../../../shared/hooks';

const MaterialsTable: React.FC = () => {
  const classes = useStyles();
  const [boundedGetMaterialsAction, boundedSetStateToInit] = useActions([
    getMaterialsAction,
    setStateToInit,
  ]);
  const { totalPages } = useSelector(selectAdminLab);
  const { sort, filters, page, textFields, size } = useSelector(selectMeta);

  useEffect(
    () => () => {
      boundedSetStateToInit();
    },
    [],
  );

  useEffect(() => {
    boundedGetMaterialsAction();
  }, [filters, sort, page, textFields, size]);

  return (
    <>
      <MaterialsTableFilters />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <MaterialsTableHead />
          <MaterialsTableBody />
        </Table>
      </TableContainer>
      {totalPages > 1 && <MaterialsTablePagination />}
    </>
  );
};

export default MaterialsTable;
