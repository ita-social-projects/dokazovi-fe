import { makeStyles } from '@material-ui/core';
import background from '../images/importantBackground.jpg';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: 455,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(15, 0, 12, 11),
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
  title: {
    margin: theme.spacing(5, 0, 3, 0),
    maxWidth: 715,
    cursor: 'pointer',
  },
  preview: {
    maxWidth: 425,
    cursor: 'pointer',
  },
  subtitle2: {
    maxWidth: 470,
  },
  h4: {
    maxWidth: 275,
    cursor: 'pointer',
  },
}));
