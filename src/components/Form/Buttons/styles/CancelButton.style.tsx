import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    cancelButton: {
      flex: '0 1 300px',
      backgroundColor: theme.palette.info.light,
      '& .MuiButton-label': {
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '18px',
        fontFamily: 'Raleway',
      },
      '&:hover': {
        backgroundColor: theme.palette.info.main,
      },
      [theme.breakpoints.down('sm')]: {
        flex: '0 1 auto',
        '& .MuiButton-label': {
          fontSize: '15px',
        },
      },
    },
  }),
  { name: 'CancelButton' },
);
