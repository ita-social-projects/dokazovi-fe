import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  filterSection: {
    backgroundColor: 'white',
    padding: '7px 30px 7px 30px',
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
