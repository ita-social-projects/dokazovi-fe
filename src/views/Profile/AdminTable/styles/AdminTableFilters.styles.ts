import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  filterSection: {
    backgroundColor: 'white',
    padding: theme.spacing(1.4, 6),
    borderRadius: 'calc( 1rem + 10px )',
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
}));
