import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  table: {
    '& .MuiTableCell-root': {
      padding: '10px',
      fontFamily: 'Raleway',
      fontWeight: '500',
    },
    '& .MuiTableCell-head': {
      lineHeight: '1rem',
      fontWeight: '700',
      fontSize: '16px',
    },
  },
  titleCol: {
    width: '220px',
    maxWidth: '220px',
    overflowX: 'hidden',
  },
}));
