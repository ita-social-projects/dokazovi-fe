import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  () => ({
    container: {
      minHeight: 600,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
  { name: 'NewestContainer' },
);
