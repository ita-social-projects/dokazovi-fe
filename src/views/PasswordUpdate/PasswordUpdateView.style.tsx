import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    error: {
      fontFamily: 'Raleway',
      fontWeight: 600,
      fontSize: theme.spacing(3.6),
      lineHeight: '22px',
      color: '#FF0707',
      marginTop: 20,
      textAlign: 'center',
    },
    successText: {
      textAlign: 'center',
    },
  }),
  {
    name: 'BasicInput',
  },
);
