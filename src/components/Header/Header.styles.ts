import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  (theme) => ({
    header: {
      height: 120,
      backgroundColor: theme.palette.common.black,
    },
    headerMobile: {
      height: 85,
      backgroundColor: theme.palette.common.black,
    },
    container: {
      height: '100%',
      padding: theme.spacing(0, 10),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 5),
      },
    },
    toolbar: {
      height: '100%',
      justifyContent: 'space-between',
      padding: 0,
    },
    logo: {
      color: theme.palette.common.white,
      marginBottom: 6,
    },
    actionsContainer: {
      display: 'flex',
      columnGap: theme.spacing(4),
    },
    tabs: {
      height: 55,
      marginLeft: '6vw',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.common.black,
      [theme.breakpoints.down('md')]: {
        margin: '0 3vw 0 4vw',
      },
    },
    tab: {
      color: theme.palette.primary.main,
      fontWeight: 600,
      '&:not(:last-child)': {
        marginRight: theme.spacing(5),
      },
      '&.active': {
        color: theme.palette.common.white,
        fontWeight: 700,
      },
    },
    tabLabel: {
      fontSize: 18,
      color: 'inherit',
      fontWeight: 'inherit',
    },
    logoMobile: {
      fontSize: 38,
      color: theme.palette.common.white,
    },
    searchIcon: {
      color: theme.palette.common.white,
      fontSize: 48,
    },
    searchInputWrapper: {
      padding: 0,
    },
    searchInput: {
      width: '85%',
      height: 39,
      fontSize: 16,
      paddingLeft: theme.spacing(2),
    },
    searchInputIcon: {
      backgroundColor: theme.palette.common.white,
      marginRight: theme.spacing(2),
      fontSize: 32,
    },
    paper: {
      width: '70%',
    },
    label: {
      padding: 0,
    },
  }),
  { name: 'Header' },
);
