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
      margin: '8px 0 0 18px',
      padding: '0 3px',
      zIndex: '10',
    },
  },

  newDate: {
    display: 'inline-block',
    border: 'solid 1px #c4c4c4',
    borderRadius: '4px',
    padding: '18px 14px',
    background: `url(${process.env.PUBLIC_URL}/dateRange.svg) right 13px center no-repeat transparent`,
    '&:hover': {
      borderColor: theme.palette.common.black,
      cursor: 'pointer',
    },
  },

  currentDate: {
    display: 'inline-block',
    border: 'solid 1px #c4c4c4',
    borderRadius: '4px',
    padding: '18px 14px',
    marginBottom: '35px',
  },
}));
