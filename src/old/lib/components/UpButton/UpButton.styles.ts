import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      button: {
        position: 'fixed',
        bottom: 20,
        left: 25,
        padding: '12px 10px',
        backgroundColor: '#000000',
        opacity: '0.4',
        color: 'white',
        borderRadius: '40px',
        zIndex: 1200,
        '&.MuiButton-root:focus': {
          backgroundColor: '#000000',
          opacity: '0.4',
        },
      },
      upIcon: {
        fontSize: 40,
      },
    }),
  { name: 'UpButton' },
);
