import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    selectedFilters: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.4',
    },
    totalFilters: {
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.3',
    },

    divider: {
      padding: '0 15px',
    },
    container: { margin: '10px 0px 36px 0px' },
  }),
  {
    name: 'ExpertsView',
  },
);
