import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    basicAcceptButton: {
      marginTop: theme.spacing(7),
      padding: theme.spacing(3.7, 2.8),
      fontFamily: 'Raleway',
      fontWeight: 600,
      fontSize: theme.spacing(3.6),
    },
    basicSignButton: {
      padding: theme.spacing(3.2, 8.8),
      borderRadius: theme.spacing(10),
      marginRight: 0,
      alignSelf: 'flex-end',
      backgroundColor: '#FF5C00',
      '& .MuiButton-label': {
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '18px',
        fontFamily: 'Raleway',
      },
      '&:hover': {
        backgroundColor: '#ffaa00',
      },
    },
  }),
  {
    name: 'BasicInput',
  },
);
