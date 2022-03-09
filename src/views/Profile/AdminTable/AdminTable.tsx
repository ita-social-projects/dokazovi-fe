import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  getMaterialsAction,
  getAuthorMaterialsAction,
  selectAdminLab,
  selectMeta,
  setStateToInit,
} from '../../../models/adminLab';
import { useStyles } from './styles/AdminTable.styles';
import AdminTableHead from './AdminTableHead';
import AdminTableBody from './AdminTableBody';
import AdminTableFilters from './AdminTableFilters';
import AdminTablePagination from './AdminTablePagination';
import { selectAuthorities } from '../../../models/authorities';
import { useActions } from '../../../shared/hooks';

interface IAdminTable {
  expertId?: number;
}

export const AdminTable: React.FC<IAdminTable> = ({ expertId }) => {
  const classes = useStyles();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');
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
      boundGetAuthorMaterialsAction(10);
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
          <AdminTableHead />
          <AdminTableBody expertId={expertId} isAdmin={isAdmin} />
        </Table>
      </TableContainer>
      {totalPages > 1 && <AdminTablePagination />}
    </>
  );
};
