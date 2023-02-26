import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableContainer,
  Box,
  Button,
  Typography,
  Link,
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

  const { totalPages, totalElements, isLastPage, pageNumber } = useSelector(
    selectExpertsData,
  );
  const {
    size,
    sort: { order, sortBy },
    textFields: { author },
  } = useSelector(selectExpertsMeta);
  const experts = useSelector(selectExpertsByIds);

  const rangeStart = pageNumber * size + 1;
  const rangeEnd = isLastPage ? totalElements : (pageNumber + 1) * size;

  useEffect(() => {
    boundExpertsStateToInit();
  }, []);

  useEffect(() => {
    boundFetchExpertsAutorsList({
      page: pageNumber,
    });
  }, [size, order, sortBy, author]);

  return (
    <>
      <Box className={classes.listFunctionalityPanel}>
        <AuthorsListFilters size={size} author={author} />
        <Link href="/create-author" underline="none" target="_blank">
          <Button variant="contained" className={classes.mainButton}>
            {i18n.t(langTokens.admin.createNewAuthor)}
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <AuthorsTableHead order={order} sortBy={sortBy} />
          <AuthorsTableBody authors={experts} />
        </Table>
      </TableContainer>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {totalElements > 0 && (
          <Typography>
            {i18n.t(langTokens.admin.authorsPerPageInfo, {
              rangeStart,
              rangeEnd,
              totalElements,
            })}
          </Typography>
        )}
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
