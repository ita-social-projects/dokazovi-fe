import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    container: {
      minHeight: 455,
    },
    containerMobile: {
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  { name: 'ImportantContainer' },
);
