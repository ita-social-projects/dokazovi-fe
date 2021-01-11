import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    minHeight: '400px',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%),',
  },
});
