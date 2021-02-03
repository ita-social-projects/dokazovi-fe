import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      margin: 20,
    },
    pagination: {
      margin: 20,
    },
    container: {
      minHeight: '1000px',
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      top: '50%',
      msTransform: 'translateY(-50%)',
      transform: 'translateY(-50%),',
    },
  },
  {
    name: 'ExpertsView',
  },
);
