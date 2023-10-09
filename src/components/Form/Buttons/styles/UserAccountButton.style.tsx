import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    userAccountButton: {
      flex: '0 1 300px',
      padding: theme.spacing(3.2, 8.8),
      '& .MuiButton-label': {
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '18px',
      },
      [theme.breakpoints.down('sm')]: {
        flex: '0 1 auto',
        padding: theme.spacing(2, 3.1),
        '& .MuiButton-label': {
          fontSize: '15px',
        },
      },
    },
    activateButton: {
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.light,
      },
    },
    createButton: {
      backgroundColor: '#73ddff',
      '&:hover': {
        backgroundColor: theme.palette.info.main,
      },
    },
    deactivateButton: {
      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.light,
      },
    },
  }),
  { name: 'UserAccountButton' },
);
