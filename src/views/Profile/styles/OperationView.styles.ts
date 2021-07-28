import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    operationView: {
      fontFamily: 'Raleway',
      position: 'relative',
      minHeight: '455px',
      marginTop: theme.spacing(-8),
      paddingLeft: '210px',
      paddingTop: '40px',
    },
  }),
  { name: 'OperationView' },
);
