import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    selectedFilters: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.4',
      margin: '0px 15px 15px 0px',
    },
    totalFilters: {
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.3',
      margin: '0px 15px 15px 0px',
    },
    divider: {
      margin: '0px 15px 15px 0px',
    },

    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '0px 0px 15px 0px',
    },
  }),
  {
    name: 'ExpertsView',
  },
);
