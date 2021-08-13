import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: theme.spacing(5, 0, 0, 0),
    },
    item: {
      marginBottom: theme.spacing(2),
    },
    card: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      '&:hover': {
        backgroundColor: '#4FDFFF',
        cursor: 'pointer',
      },
    },
    cell: {
      minWidth: '500px',
      border: 'none',
      padding: theme.spacing(0, 2, 0, 2),
      [theme.breakpoints.down('md')]: {
        minWidth: '360px',
      },
    },
    title: {
      margin: theme.spacing(0),
      fontSize: '16px',
      lineHeight: '18px',
      wordWrap: 'break-word',
      color: theme.palette.common.black,
    },
    iconBlack: {
      margin: theme.spacing(0, 0, 0, 2),
      color: 'black',
    },
    btn: {
      background: 'black',
      color: 'white',
      fontWeight: 600,
      width: '80px',
    },
  }),
  { name: 'PostsList' },
);
