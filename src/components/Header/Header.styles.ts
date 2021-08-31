import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  (theme) => ({
    header: {
      height: 120,
      backgroundColor: theme.palette.common.black,
    },
    container: {
      height: '100%',
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
      padding: theme.spacing(0, 16),
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.common.black,
    },
    tab: {
      marginRight: theme.spacing(5),
      color: theme.palette.primary.main,
      fontWeight: 600,
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
      width: 320,
    },
  }),
  { name: 'Header' },
);
