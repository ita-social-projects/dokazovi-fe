import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    container: {
      overflowX: 'auto',
      paddingTop: '10px',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      margin: '0 -50px',
    },
  }),
  { name: 'AdminPageWrapper' },
);
