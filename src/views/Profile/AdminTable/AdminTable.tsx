import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  getMaterialsAction,
  selectAdminLab,
  selectMeta,
  setStateToInit,
} from '../../../models/adminLab';
import { useStyles } from './styles/AdminTable.styles';
import AdminTableHead from './AdminTableHead';
import AdminTableBody from './AdminTableBody';
import AdminTableFilters from './AdminTableFilters';
import AdminTablePagination from './AdminTablePagination';
import { useActions } from '../../../shared/hooks';

const AdminTable: React.FC = () => {
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
      <AdminTableFilters />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <AdminTableHead />
          <AdminTableBody />
        </Table>
      </TableContainer>
      {totalPages > 1 && <AdminTablePagination />}
    </>
  );
};

export default AdminTable;
