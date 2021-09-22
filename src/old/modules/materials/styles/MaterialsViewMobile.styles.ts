import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    container: {
      padding: 0,
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
  }),
  {
    name: 'MaterialsViewMobile',
  },
);
