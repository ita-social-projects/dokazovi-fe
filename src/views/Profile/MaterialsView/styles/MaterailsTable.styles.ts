import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  table: {
    marginBottom: '1rem',
    '& .MuiTableCell-root': {
      padding: '9px',
      fontFamily: 'Raleway',
      fontWeight: '500',
    },
    '& .MuiTableCell-head': {
      lineHeight: '1rem',
      fontWeight: '700',
      fontSize: '16px',
    },
  },
}));
