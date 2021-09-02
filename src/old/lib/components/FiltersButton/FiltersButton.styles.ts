import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      button: {
        position: 'fixed',
        bottom: 20,
        right: 25,
        padding: '20px 24px',
        background: '#FF5C00',
        color: 'white',
        borderRadius: '40px',
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '21px',
      },
    }),
  { name: 'LoadMoreButton' },
);
