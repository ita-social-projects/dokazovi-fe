import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () =>
    createStyles({
      button: {
        position: 'fixed',
        bottom: 20,
        left: 25,
        padding: '12px 10px',
        backgroundColor: '#FF5C00',
        opacity: '0.8',
        color: 'white',
        borderRadius: '40px',
        zIndex: 1200,
        '&.MuiButton-root:focus': {
          backgroundColor: '#FF5C00',
          opacity: '0.8',
        },
      },
      upIcon: {
        fontSize: 40,
      },
    }),
  { name: 'UpButton' },
);
