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
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 1500,
    },
    container: {
      height: '100%',
      width: '100%',
      padding: theme.spacing(0, 10),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 5),
      },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toolbarMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    toolbarDesktop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
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
    searchInput: {
      background: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      marginLeft: theme.spacing(0),
    },
    searchInputIcon: {
      backgroundColor: theme.palette.common.white,
      marginRight: theme.spacing(1),
      fontSize: 32,
      position: 'relative',
      top: '1px',
    },
    paper: {
      width: '70%',
    },
    label: {
      padding: 0,
    },
    inputAdornment: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    myPopper: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'Header' },
);
