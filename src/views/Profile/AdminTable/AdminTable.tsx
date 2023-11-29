import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  getAuthorMaterialsAction,
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
import { useCheckAdmin } from '../../../old/lib/hooks/useCheckAdmin';

interface IAdminTable {
  expertId?: number;
}

export const AdminTable: React.FC<IAdminTable> = ({ expertId }) => {
  const classes = useStyles();
  const isAdmin = useCheckAdmin();
  const [
    boundedGetMaterialsAction,
    boundGetAuthorMaterialsAction,
    boundedSetStateToInit,
  ] = useActions([
    getMaterialsAction,
    getAuthorMaterialsAction,
    setStateToInit,
  ]);
  const { totalPages } = useSelector(selectAdminLab);
  const meta = useSelector(selectMeta);

  useEffect(
    () => () => {
      boundedSetStateToInit();
    },
    [],
  );

  useEffect(() => {
    if (isAdmin) {
      boundedGetMaterialsAction();
    } else {
      boundGetAuthorMaterialsAction(expertId);
    }
  }, [meta]);

  return (
    <>
      <AdminTableFilters />
      <TableContainer
        component={Paper}
        classes={{ root: classes.tableContainer }}
      >
        <Table>
          <AdminTableHead isAdmin={isAdmin} />
          <AdminTableBody isAdmin={isAdmin} />
        </Table>
      </TableContainer>
      {totalPages > 1 && <AdminTablePagination />}
    </>
  );
};
