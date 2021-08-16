import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    page: {
      margin: theme.spacing(10, 'auto'),
      padding: theme.spacing(0, 5),
    },
  }),
  { name: 'Page' },
);