import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '7px 0px 15px 0px',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      width: '100%',
      margin: '0 0 28px 0',
      fontSize: '28px',
      lineHeight: '28px',
      fontWeight: 'bold',
    },
    selectedFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.4',
    },
    totalFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.29',
    },
    divider: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '1.4',
    },
    chipsHeading: {
      margin: '0px 20px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
    },
    gridContainer: {
      paddingLeft: '40px',
    },
    materialsContainer: {
      paddingLeft: '50px',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '30px',
      },
    },
  }),
  {
    name: 'ExpertsView',
  },
);
