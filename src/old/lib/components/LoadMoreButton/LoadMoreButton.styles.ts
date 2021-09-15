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
        '& .MuiSvgIcon-root': {
          color: '#73DDFF',
          marginRight: theme.spacing(2),
          transform: 'rotate(43deg)',
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
      spinning: {
        animation: `2s $spinEffect infinite`,
      },
      '@keyframes spinEffect': {
        '0%': {
          transform: 'rotate(43deg)',
        },
        '100%': {
          transform: 'rotate(403deg)',
        },
      },
    }),
  { name: 'LoadMoreButton' },
);
