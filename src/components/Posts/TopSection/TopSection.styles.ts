import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5),
    },
    avatar: {
      height: 150,
      width: 150,
      borderRadius: '50%',
      filter: 'grayscale(100%)',
      marginRight: theme.spacing(4),
    },
    authorName: {
      fontSize: '24px',
      lineHeight: '1.17',
    },
    authorBio: {
      fontSize: '15px',
      lineHeight: '1.47',
    },
  }),
  { name: 'PostView' },
);
