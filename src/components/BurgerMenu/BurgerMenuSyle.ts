import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.white,
  },
  menuIcon: {
    fontSize: 48,
  },
  header: {
    fontSize: 32,
    marginTop: theme.spacing(8),
  },
  list: {
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    border: 'none',
    width: `200px`,
    paddingLeft: theme.spacing(5),
  },
  link: {
    display: 'block',
    marginTop: theme.spacing(8),
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&.active': {
      fontWeight: 800,
      color: theme.palette.common.white,
    },
  },
  headerLinks: {
    fontSize: 22,
  },
  footerLinks: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '18px',
  },
  root: {
    right: 'auto',
    backgroundColor: theme.palette.common.black,
  },
}));
