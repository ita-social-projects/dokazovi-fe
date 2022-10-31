import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  mainButton: {
    padding: theme.spacing(2, 3),
    color: theme.palette.common.white,
    backgroundColor: '#73ddff',
    cursor: 'pointer',
    marginBlock: 'auto',
  },

  listFunctionalityPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '15px',
  },

  tableContainer: {
    marginBottom: '1rem',
    '& .MuiTableCell-root': {
      padding: theme.spacing(2.5),
      ...theme.typography.h6,
    },
    '& .MuiTableCell-head': {
      ...theme.typography.button,
    },
  },
}));
