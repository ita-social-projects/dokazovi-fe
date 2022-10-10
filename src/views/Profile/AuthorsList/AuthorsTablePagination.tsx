import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useActions } from '../../../shared/hooks';
import { setPageNumber } from '../../../models/experts';

interface IAuthorsTablePaginationProps {
  totalPages: number;
  pageNumber: number;
}

export const AuthorsTablePagination: React.FC<IAuthorsTablePaginationProps> = (
  props,
) => {
  const { totalPages, pageNumber } = props;

  const [boundSetPageNumber] = useActions([setPageNumber]);

  const handlePageSelection = (_: unknown, page: number) => {
    boundSetPageNumber(page - 1);
  };

  return (
    <Pagination
      page={pageNumber + 1}
      onChange={handlePageSelection}
      count={totalPages}
    />
  );
};
