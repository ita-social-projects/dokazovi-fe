import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  pickersWrappper: {
    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));
