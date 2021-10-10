import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  table: {
    '& .MuiTableCell-root': {
      border: '1px solid black',
      padding: '10px',
    },
    '& .MuiTableCell-head': {
      lineHeight: '1rem',
    },
  },
  titleCol: {
    width: '220px',
    maxWidth: '220px',
    overflowX: 'hidden',
  },
}));
