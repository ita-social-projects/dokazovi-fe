import React from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import AuthorsListTableHead from './AuthorsListTableHead';
import AuthorsListTableBody from './AuthorsListTableBody';

export const AuthorsList: React.FC = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <AuthorsListTableHead />
          <AuthorsListTableBody />
        </Table>
      </TableContainer>
    </>
  );
};
