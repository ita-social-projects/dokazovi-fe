import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    container: {
      overflowX: 'auto',
      paddingTop: '10px',
    },
  }),
  { name: 'AdminPageWrapper' },
);
