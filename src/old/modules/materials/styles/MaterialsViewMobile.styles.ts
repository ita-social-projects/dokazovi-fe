import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    container: {
      padding: 0,
    },
    headerContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '30px 0 20px',
    },
    divider: {
      width: '100%',
      height: '1px',
      background: 'black',
    },
    header: {
      lineHeight: '22px',
      fontSize: '24px',
      fontFamily: 'Raleway',
      fontWeight: 700,
      paddingInline: '15px',
    },
  }),
  {
    name: 'MaterialsViewMobile',
  },
);
