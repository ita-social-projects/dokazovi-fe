import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    dialogTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '15px',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    },
    viewsInput: {
      border: '2px solid #F3F3F3',
      padding: theme.spacing(2),
      borderRadius: 10,
    },
    modalBtns: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '30px 15px',
    },
    primaryBtn: {
      borderRadius: 10,
      backgroundColor: '#10A9FF',
      padding: '15px 30px',
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: '#10A9FF',
      },
    },
    secondaryBtn: {
      borderRadius: 10,
    },
  }),
  { name: 'ViewCountModal' },
);
