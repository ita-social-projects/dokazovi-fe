import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    operationView: {
      fontFamily: 'Raleway',
      position: 'relative',
      minHeight: '455px',
      marginTop: theme.spacing(-8),
      paddingLeft: '110px',
      '& .adminInitialView': {
        position: 'absolute',
        top: '30%',
        right: '30%',
        '& .initialMessage': {
          fontSize: '26px',
          fontFamily: 'Raleway',
          fontWeight: 500,
        },
      },
      '& .menuPath': {
        fontSize: '20px',
        fontFamily: 'Raleway',
        fontWeight: 500,
        color: '#4f4f4f',
      },
      '& .menuTitle': {
        fontSize: '20px',
        fontFamily: 'Raleway',
        fontWeight: 'bold',
        borderBottom: '2px solid black',
        marginTop: theme.spacing(2),
      },
    },
  }),
  { name: 'OperationView' },
);
