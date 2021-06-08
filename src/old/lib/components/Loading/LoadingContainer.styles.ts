import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    relativeContainer: {
      marginTop: '30vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  { name: 'LoadingContainer' },
);
