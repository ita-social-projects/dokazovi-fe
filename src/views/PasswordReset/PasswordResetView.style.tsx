import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    centerText: {
      textAlign: 'center',
    },
  }),
  {
    name: 'BasicInput',
  },
);
