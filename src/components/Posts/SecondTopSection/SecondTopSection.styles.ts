import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      marginTop: '50px',
      marginBottom: '50px',
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
  { name: 'SecondPostView' },
);
