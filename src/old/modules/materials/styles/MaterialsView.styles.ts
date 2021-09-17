import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      margin: '7px 0px 15px 0px',
      justifyContent: 'flex-start',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
        width: '280px',
        height: '48px',
      },
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
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'nowrap',
      },
    },
    totalFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.29',
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'nowrap',
        lineHeight: '1.4',
      },
    },
    divider: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '1.4',
    },
    gridSpacing: {
      paddingLeft: '20px',
    },
  }),
  {
    name: 'MaterialsView',
  },
);
