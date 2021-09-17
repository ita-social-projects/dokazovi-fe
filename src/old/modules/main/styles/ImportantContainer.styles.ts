import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    container: {
      minHeight: 455,
    },
    containerMobile: {
      minHeight: 585,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  { name: 'ImportantContainer' },
);
