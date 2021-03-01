import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.info.light,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
  label: {
    color: theme.palette.common.white,
  },
}));
