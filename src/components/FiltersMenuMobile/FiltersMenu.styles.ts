import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.common.white,
      width: '85vw',
      padding: '34px 47px 0px 27px',
    },
    container: {
      justifyContent: 'space-between',
    },
    containerSelected: {
      marginTop: '85px',
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
      fontStyle: 'italic',
      paddingLeft: '15px',
    },
    selectedTypesContainer: {
      alignItems: 'center',
    },
    selectedTypes: {
      margin: '26px 0 0',
    },
    arrowForward: {
      fontSize: 18,
      fontWeight: 200,
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
