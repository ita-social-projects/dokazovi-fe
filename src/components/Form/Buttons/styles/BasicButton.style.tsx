import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    basicAcceptButton: {
      marginTop: theme.spacing(7),
      padding: theme.spacing(3.7, 2.8),
      fontWeight: 600,
      fontSize: theme.spacing(3.6),
    },
    basicSignButton: {
      padding: theme.spacing(3.2, 8.8),
      borderRadius: theme.spacing(10),
      flex: '0 1 300px',
      marginRight: 0,
      backgroundColor: '#FF5C00',
      '& .MuiButton-label': {
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '18px',
      },
      '&:hover': {
        backgroundColor: '#ffaa00',
      },
      [theme.breakpoints.down('sm')]: {
        flex: '0 1 auto',
        padding: theme.spacing(2, 3.1),
        '& .MuiButton-label': {
          fontSize: '15px',
        },
      },
    },
  }),
  {
    name: 'BasicInput',
  },
);
