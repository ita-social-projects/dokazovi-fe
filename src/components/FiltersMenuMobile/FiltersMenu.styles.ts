import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.common.white,
      width: '320px',
      padding: '34px 47px 0px 27px',
    },
    headerSelected: {
      color: '#FF5C00',
      fontFamily: 'Raleway',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    headerSelectedCount: {
      color: '#767676',
      fontFamily: 'Literata',
      fontSize: '14px',
      fontWeight: 400,
      fontStyleL: 'italic',
    },
    subHeaderContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '26px 0px',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    selectedFilters: {
      margin: '0px 15px 15px 0px',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.4',
    },
  }),
  {
    name: 'FiltersMenu',
  },
);
