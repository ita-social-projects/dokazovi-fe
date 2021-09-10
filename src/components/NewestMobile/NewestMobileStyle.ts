import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  selected: {
    color: 'black !important',
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
    marginTop: theme.spacing(5),
  },
}));
