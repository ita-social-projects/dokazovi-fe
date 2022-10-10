import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableContainer,
  Box,
  Button,
  Typography,
} from '@material-ui/core';

import AuthorsTableHead from './AuthorsTableHead';
import AuthorsTableBody from './AuthorsTableBody';
import { AuthorsTablePagination } from './AuthorsTablePagination';
import { AuthorsListFilters } from './AuthorsListFilters';
import { useStyles } from './styles/AuthorsList.styles';
import i18n, { langTokens } from '../../../locales/localizationInit';
import {
  fetchExpertsAutorsList,
  selectExpertsData,
  selectExpertsMeta,
  setExpertsStateToInit,
  selectExpertsByIds,
} from '../../../models/experts';
import { useActions } from '../../../shared/hooks';

export const AuthorsList: React.FC = () => {
  const classes = useStyles();
  const [boundFetchExpertsAutorsList, boundExpertsStateToInit] = useActions([
    fetchExpertsAutorsList,
    setExpertsStateToInit,
  ]);

  const { expertIds, totalPages, totalElements } = useSelector(
    selectExpertsData,
  );
  const {
    pageNumber,
    size,
    sort: { order, sortBy },
    textFields: { author },
  } = useSelector(selectExpertsMeta);
  const experts = selectExpertsByIds(expertIds);

  const maxCouldBePerPage = (pageNumber + 1) * Number(size);
  const from =
    pageNumber === 0 ? pageNumber + 1 : maxCouldBePerPage - (Number(size) - 1);
  const to = totalPages === pageNumber + 1 ? totalElements : maxCouldBePerPage;

  useEffect(() => {
    boundExpertsStateToInit();
  }, []);

  useEffect(() => {
    boundFetchExpertsAutorsList({
      page: pageNumber,
    });
  }, [size, pageNumber, order, sortBy, author]);

  return (
    <>
      <Box className={classes.listFunctionalityPanel}>
        <AuthorsListFilters size={size} author={author} />
        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
          }}
          className={classes.mainButton}
        >
          {i18n.t(langTokens.admin.createNewAuthor)}
        </Button>
      </Box>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <AuthorsTableHead order={order} sortBy={sortBy} />
          <AuthorsTableBody authors={experts} />
        </Table>
      </TableContainer>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>
          {/* need to add langToken */}
          {`Відображено від ${from} до ${to} записів з
          ${totalElements} доступних`}
        </Typography>
        {totalPages > 1 && (
          <AuthorsTablePagination
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Box>
    </>
  );
};
