import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: 'transparent',
    },
    name: {
      cursor: 'pointer',
      margin: theme.spacing(5.4, 0, 2, 0),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(2, 0, 1, 0),
        fontSize: 15,
      },
    },
    qualification: {
      color: theme.palette.text.secondary,
      fontSize: 15,
      lineHeight: '20px',
      [theme.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
  }),
  {
    name: 'ExpertDataCard',
  },
);
