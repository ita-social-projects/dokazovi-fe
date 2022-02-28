import React, { useEffect } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  getMaterialsAction,
  selectAdminLab,
  selectMeta,
  setStateToInit,
} from '../../../models/adminLab';
import { useStyles } from '../AdminTable/styles/AdminTable.styles';
import AdminTableHead from '../AdminTable/AdminTableHead';
import AdminTableBody from '../AdminTable/AdminTableBody';
import AdminTableFilters from '../AdminTable/AdminTableFilters';
import AdminTablePagination from '../AdminTable/AdminTablePagination';
import { useActions } from '../../../shared/hooks';

export const AuthorTable: React.FC = () => {
  const classes = useStyles();
  const [boundedGetMaterialsAction, boundedSetStateToInit] = useActions([
    getMaterialsAction,
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
    boundedGetMaterialsAction();
  }, [meta]);

  return (
    <>
      <AdminTableFilters />
      {/* <TableContainer
        component={Paper}
        classes={{ root: classes.tableContainer }}
      >
        <Table>
          <AdminTableHead />
          <AdminTableBody />
        </Table>
      </TableContainer>
      {totalPages > 1 && <AdminTablePagination />} */}
    </>
  );
};
