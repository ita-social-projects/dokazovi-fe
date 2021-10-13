import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'flex-end',
    },
  },
}));
