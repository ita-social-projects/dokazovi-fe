import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  filtersBox: {
    display: 'flex',
    flexDirection: 'row',
    '& .MuiFormControl-root': {
      flexDirection: 'row',
    },

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.common.white,
      borderRadius: '2px',
    },
  },
  notesToShowPanel: {
    margin: 'auto 15px auto auto',
  },
}));
