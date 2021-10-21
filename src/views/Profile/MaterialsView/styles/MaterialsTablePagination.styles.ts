import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  },
}));
