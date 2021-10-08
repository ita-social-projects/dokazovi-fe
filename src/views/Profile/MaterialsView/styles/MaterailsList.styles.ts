import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  table: {
    '& .MuiTableCell-root': {
      border: '1px solid black',
    },
  },
  titleCol: {
    width: '220px',
    maxWidth: '220px',
    overflowX: 'hidden',
  },
}));
