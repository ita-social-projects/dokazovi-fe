import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    paddingBottom: 0,
  },
  indicator: {
    backgroundColor: theme.palette.common.black,
  },
  appBarRoot: {
    backgroundColor: theme.palette.background.default,
  },
  buttonsRoot: {
    margin: 0,
    width: '100%',
  },
  selected: {
    color: `${theme.palette.common.black} !important`,
    fontWeight: 700,
  },
  textColorPrimary: {
    color: theme.palette.text.secondary,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
  },
  content: {
    marginTop: theme.spacing(3),
  },
  tabRoot: {
    padding: 0,
  },
  wrapper: {
    fontSize: 16,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    alignItems: 'center',
  },
  stickyTop: {
    position: 'sticky',
    top: 0,
    left: 0,
  },
  sticky: {
    position: 'sticky',
    top: 85,
    left: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4FDFFF',
    border: 'none',
    height: '44px',
    borderRadius: '300px',
    marginBottom: theme.spacing(2),
    '& .MuiButton-label': {
      color: theme.palette.common.black,
      fontWeight: 500,
      fontSize: '16px',
    },
  },
}));
