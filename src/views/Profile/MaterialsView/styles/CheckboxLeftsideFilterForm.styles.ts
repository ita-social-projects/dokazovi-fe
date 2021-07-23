import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    borderRadius: 3,
    width: '15px',
    height: '15px',
    backgroundColor: '#ffffff',
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: '#E5E5E5',
      border: '3px solid white',
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
  },
  checkedIcon: {
    backgroundColor: '#4FDFFF',
    borderRadius: 3,
    display: 'block',
    width: '15px',
    height: '15px',
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
    '&:before': {
      width: '14.38px',
      height: '5.6px',
      display: 'block',
      content: "''",
      position: 'relative',
      borderBottom: '3px solid #000000',
      borderLeft: '3px solid #000000',
      transform: 'rotate(-45deg)',
      left: '2px',
      top: '2px',
    },
  },
  formControlLabel: {
    height: '30px',
    width: '160px',
    margin: '0 0 0 -8px',
  },
  filtersWrapper: {
    width: '180px',
    padding: theme.spacing(6, 0, 0, 0),
    margin: theme.spacing(0),
  },
  formGroup: {
    margin: '0 ',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  allCheckedTrue: {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 700,
    color: '#000000',
  },
  allCheckedFalse: {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#000000',
  },
}));
