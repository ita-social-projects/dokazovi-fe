import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: 'transparent',
    },
    name: {
      cursor: 'pointer',
      margin: theme.spacing(5.4, 0, 2, 0),
    },
    qualification: {
      color: theme.palette.text.secondary,
      fontSize: 15,
      lineHeight: '20px',
    },
  }),
  {
    name: 'ExpertDataCard',
  },
);
