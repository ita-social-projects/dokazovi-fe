import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: '50px',
      marginBottom: '50px',
      [theme.breakpoints.down('xs')]: {
        margin: '0 15px',
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
        marginBottom: '30px',
      },
    },
  }),
  { name: 'SecondPostView' },
);
