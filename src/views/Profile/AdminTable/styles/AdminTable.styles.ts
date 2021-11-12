import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '1rem',
    '& .MuiTableCell-root': {
      padding: theme.spacing(1.8),
      ...theme.typography.h6,
    },
    '& .MuiTableCell-head': {
      ...theme.typography.button,
    },
  },
}));
