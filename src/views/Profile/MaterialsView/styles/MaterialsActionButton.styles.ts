import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontFamily: 'Raleway',
  },
  icon: {
    padding: 0,
    color: theme.palette.common.black,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
