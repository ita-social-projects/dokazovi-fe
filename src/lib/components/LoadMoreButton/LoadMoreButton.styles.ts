import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(12),
        backgroundColor: theme.palette.common.black,
        height: '44px',
        borderRadius: '300px',
        '& .MuiButton-label': {
          color: theme.palette.common.white,
          fontWeight: 500,
          fontSize: '16px',
        },
        '& .MuiCircularProgress-circle': {
          color: '#73DDFF',
        },
        '& .MuiCircularProgress-root': {
          marginRight: theme.spacing(2),
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: theme.palette.common.black,
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.common.black,
        },
      },
    }),
  { name: 'LoadMoreButton' },
);
