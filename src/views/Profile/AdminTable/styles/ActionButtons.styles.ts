import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  mainButton: {
    minWidth: '1px',
    width: theme.spacing(10),
    height: theme.spacing(10),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 0,
      color: theme.palette.common.black,
    },
  },
  btnGroup: {
    '& .MuiButton-root': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));
