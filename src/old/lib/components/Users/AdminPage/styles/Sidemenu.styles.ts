import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    sidemenuHeader: {
      fontSize: '20px',
      fontWeight: 500,
      fontFamily: 'Raleway',
      color: '#4f4f4f',
      marginBottom: theme.spacing(2),
    },
    sidemenuBody: {
      minWidth: '200px',
      top: theme.spacing(24),
      height: '100%',
      paddingTop: theme.spacing(2),
      backgroundColor: '#e5e5e5',
      position: 'static',
      border: 'none',
    },
    menuCategory: {
      fontWeight: 'bold',
      borderBottom: '2px solid black',
      margin: '0 5%',
      fontFamily: 'Raleway',
      fontSize: '18px',
    },
  }),
  { name: 'Sidemenu' },
);
