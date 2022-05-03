import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '1rem',
    '& .MuiTableCell-root': {
      padding: theme.spacing(1.5),
      ...theme.typography.h6,
    },
    '& .MuiTableCell-head': {
      ...theme.typography.button,
    },
  },
  // width: {
  //   width: '1100px',
  // }
}));
