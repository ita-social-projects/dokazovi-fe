import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  dropdown: {
    marginInline: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    '& .MuiSelect-root': {
      paddingLeft: theme.spacing(1),
    },
  },
}));
