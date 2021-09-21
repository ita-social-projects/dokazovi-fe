import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      button: {
        position: 'fixed',
        bottom: 20,
        right: 25,
        padding: '12px 10px',
        background: '#FF5C00',
        color: 'white',
        borderRadius: '40px',
        fontFamily: 'Raleway',
        fontWeight: 700,
        zIndex: 1400,
        '&.MuiButton-root:hover': {
          background: '#FF5C00',
        },
      },
      close: {
        padding: '12px 10px',
      },
      open: {
        fontSize: 21,
        padding: '23px 24px',
      },
      closeIcon: {
        fontSize: 40,
      },
    }),
  { name: 'LoadMoreButton' },
);
