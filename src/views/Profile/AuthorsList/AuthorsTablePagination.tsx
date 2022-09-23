import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useActions } from '../../../shared/hooks';
import { fetchExpertsAutorsList } from '../../../models/experts';

interface IAuthorsTablePaginationProps {
  totalPages: number;
  pageNumber: number;
}

export const AuthorsTablePagination: React.FC<IAuthorsTablePaginationProps> = (
  props,
) => {
  const { totalPages, pageNumber } = props;

  const [boundFetchExpertsAutorsList] = useActions([fetchExpertsAutorsList]);

  const handlePageSelection = (_: unknown, page: number) => {
    boundFetchExpertsAutorsList({
      page: page - 1,
    });
  };

  return (
    <Pagination
      page={pageNumber + 1}
      onChange={handlePageSelection}
      count={totalPages}
    />
  );
};
