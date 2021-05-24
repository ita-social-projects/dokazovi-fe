import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(4),
    minWidth: 0,
    padding: 0,
  },
  icon: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  label: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(4),
  },
}));
