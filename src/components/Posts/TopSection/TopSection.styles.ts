import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(16),
        padding: '15px 20px 0',
        marginBottom: 0,
      },
    },

    avatarSection: {
      [theme.breakpoints.down('xs')]: {
        alignSelf: 'flex-start',
      },
    },

    avatar: {
      height: 150,
      width: 150,
      borderRadius: '50%',
      marginRight: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        width: 87,
        height: 87,
        marginRight: '20px',
      },
    },
    authorName: {
      fontSize: '24px',
      lineHeight: '1.17',
      [theme.breakpoints.down('xs')]: {
        fontSize: '18px',
        marginBottom: '5px',
      },
    },

    authorBio: {
      fontSize: '15px',
      lineHeight: '1.47',
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
        fontStyle: 'italic',
        lineHeight: '1.43',
      },
    },
  }),
  { name: 'PostView' },
);
