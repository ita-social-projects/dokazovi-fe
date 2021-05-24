import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    cardContainer: {
      minHeight: '550px',
      padding: theme.spacing(9),
    },
    authorBlock: {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5),
    },
    avatar: {
      height: 130,
      width: 130,
      borderRadius: '50%',
      filter: 'grayscale(100%)',
      marginRight: theme.spacing(4),
    },
    actionsBlock: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    contentRoot: {
      minHeight: '550px',
    },
    createdAt: {
      color: theme.palette.info.light,
    },
    content: {
      ...theme.typography.body1,
      marginTop: theme.spacing(6),
      '& h1': {
        fontSize: '2em',
      },
      '& h2': {
        fontSize: '1.5em',
      },
    },
  }),
  { name: 'PostView' },
);
