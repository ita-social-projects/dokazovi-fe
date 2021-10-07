import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    container: {
      padding: 'auto',
      minHeight: 'calc(100vh - 353px)',
    },
    headerContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '25px 10px 20px',
    },
    divider: {
      width: '40%',
      height: '1px',
      background: 'black',
    },
    header: {
      lineHeight: '22px',
      fontSize: '24px',
      fontFamily: 'Raleway',
      fontWeight: 700,
      paddingInline: '15px',
      whiteSpace: 'nowrap',
    },
    showAllButton: {
      margin: '20px 0 30px 0',
      width: '217px',
      height: '48px',
      border: 'none',
      borderRadius: '24px',
      fontSize: '17px',
      backgroundColor: '#4FDFFF',
    },
  }),
  {
    name: 'ExpertsViewMobile',
  },
);
