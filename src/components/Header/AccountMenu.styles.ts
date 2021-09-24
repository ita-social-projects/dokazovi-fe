import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  name: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(4),
  },
  menu: {
    marginTop: theme.spacing(2),
  },
  icon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));
