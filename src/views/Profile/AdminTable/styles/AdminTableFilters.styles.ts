import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  filterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: theme.spacing(1.4, 6),
    borderRadius: theme.spacing(0.8),
    marginBottom: '1rem',
    width: '100%',
    alignItems: 'center',
  },
  clearButton: {
    padding: 0,
    color: theme.palette.common.black,
    '&:hover': {
      color: theme.palette.action.hover,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    ...theme.typography.button,
  },
}));
