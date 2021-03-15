import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    expandedContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
  },
  { name: 'LoadingContainer' },
);
