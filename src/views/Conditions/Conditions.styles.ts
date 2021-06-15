import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},

    nav: {
      display: 'flex',
      listStyle: 'none',
      '& > *:not(:last-child)': {
        marginRight: '20px',
      },
      '& > li': {
        color: '#2F80ED',
        textDecoration: 'underline',
      },
    },
  }),
  { name: 'ConditionsView' },
);
