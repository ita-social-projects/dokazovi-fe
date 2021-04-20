import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        '&::before, &::after ': {
          alignItems: 'center',
          display: 'flex',
          flex: '1 1',
          content: '""',
          alignSelf: 'center',
          boxSizing: 'border-box',
          height: '1px',
          margin: 'auto',
          backgroundColor: theme.palette.common.black,
        },
      },
      button: {
        alignItems: 'center',
        margin: theme.spacing(15, 4.5),
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
