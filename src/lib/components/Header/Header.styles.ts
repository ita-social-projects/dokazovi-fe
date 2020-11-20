import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
  },
  generalNavigation: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    '& li': {
      width: 'auto',
      color: 'inherit',
    },
    backgroundColor: theme.palette.grey[100],
    padding: 0,
  },
  horizMenu: {
    display: 'flex',
  },
  logIn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
}));
