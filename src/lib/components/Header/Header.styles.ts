import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
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
}));
