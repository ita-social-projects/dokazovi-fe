import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
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
    width: '260px',
    margin: '0 0 0 -8px',
  },
  filtersWrapper: {
    width: '280px',
  },
});
