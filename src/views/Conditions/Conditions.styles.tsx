import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
  }),
  { name: 'Conditions' },
);
