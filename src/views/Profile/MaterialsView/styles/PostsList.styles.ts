import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      width: '100%',
      padding: theme.spacing(6, 0, 0, 0),
    },
    item: {
      marginBottom: theme.spacing(2),
    },
    card: {
      position: 'relative',
      border: 'none',
      minWidth: '875px',
      alignItems: 'center',
      display: 'flex',
      '&:hover': {
        // backgroundColor: '#ebf1f5',
        backgroundColor: '#4FDFFF',
        cursor: 'pointer',
      },
    },
    cell: {
      border: 'none',
      padding: theme.spacing(0, 2, 0, 2),
    },
    title: {
      wordWrap: 'break-word',
      fontSize: '16px',
      margin: theme.spacing(0),
      color: theme.palette.common.black,
    },
    iconBlack: {
      color: 'black',
      margin: theme.spacing(0, 0, 0, 2),
    },
  }),
  { name: 'PostsList' },
);
