import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    container: {
      minHeight: 455,
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      top: 'calc(50% - 30px)',
      msTransform: 'translateY(-50%)',
      transform: 'translateY(-50%),',
    },
  },
  { name: 'ImportantContainer' },
);
