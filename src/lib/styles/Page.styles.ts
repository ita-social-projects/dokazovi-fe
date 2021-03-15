import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    page: {
      margin: theme.spacing(5, 0),
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  }),
  { name: 'Page' },
);
