import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: theme.spacing(6),
    position: 'relative',
  },

  dateRangeIcon: {
    position: 'absolute',
    right: '14px',
    bottom: '16px',
  },

  datePicker: {
    position: 'relative',

    '& > label': {
      backgroundColor: theme.palette.common.white,
      margin: '8px 0 0 18.5px',
      padding: '0 3px',
      zIndex: '10',
    },
  },

  currentDate: {
    display: 'inline-block',
    border: 'solid 1px #c4c4c4',
    borderRadius: '4px',
    padding: '18px 14px',
    '&:hover': {
      borderColor: theme.palette.common.black,
      cursor: 'pointer',
    },
  },
}));
