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
    addMaterialsSection: {
      backgroundColor: '#e5e5e5',
      marginBottom: theme.spacing(6),
      '&::before': {
        height: 0,
      },
      '& .sectionDetails': {
        flexDirection: 'column',
        padding: theme.spacing(0),
      },
    },
    addMaterialsHeader: {
      border: '1px solid #000',
    },
  }),
  {
    name: 'MaterialsViewByStatus',
  },
);
