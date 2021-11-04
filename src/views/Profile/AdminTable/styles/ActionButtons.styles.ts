import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  mainButton: {
    backgroundColor: theme.palette.background.default,
    minWidth: '1px',
    width: theme.spacing(7),
    height: theme.spacing(7),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
      color: theme.palette.common.black,
    },
  },
  menuRoot: {
    '& .MuiMenu-paper': {
      boxShadow: 'rgb(0 0 0 / 16%) 2px 2px 2px 2px',
    },
    '& .MuiList-root': {
      padding: 0,
    },
    '& .MuiButtonBase-root': {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));
