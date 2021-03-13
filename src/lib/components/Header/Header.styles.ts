import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  header: {
    height: 150,
    padding: theme.spacing(0, 7),
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'space-between',
  },
  logo: {
    marginBottom: 6,
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: theme.spacing(5),
    '& span': {
      color: theme.palette.info.light,
    },
  },
  community: {
    display: 'flex',
    alignItems: 'center',
  },
  postCreationMenu: {
    marginLeft: theme.spacing(5),
  },
  search: {
    margin: theme.spacing(0, 5),
  },
  tabs: {
    height: 55,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 7),
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
    color: 'inherit',
    fontWeight: 'inherit',
  },
}));
