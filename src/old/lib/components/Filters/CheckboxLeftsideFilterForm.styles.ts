import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
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
      [theme.breakpoints.down('xs')]: {
        border: '1px solid #4FDFFF',
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
        [theme.breakpoints.down('xs')]: {
          backgroundColor: '#4FDFFF',
        },
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
      fontWeight: 700,
      height: '30px',
      margin: '0 0 0 -8px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
        lineHeight: '21px',
        margin: '8px 0',
        '& .MuiCheckbox-root': {
          paddingLeft: 0,
        },
      },
    },
    filtersWrapper: {
      marginTop: '0',
    },
    titleWrapper: {
      width: '100%',
    },
    filterTitle: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontSize: '18px',
      lineHeight: '18px',
      fontWeight: 'bold',
      [theme.breakpoints.down('xs')]: {
        fontSize: '21px',
        marginBottom: 5,
      },
    },
    divider: {
      width: '100%',
      height: '4px',
      background: '#000000',
      margin: '2px 0 20px 0',
      [theme.breakpoints.down('sm')]: {
        width: '225px',
        margin: '2px 0 2px 0',
      },
    },
    dividerMV: {
      width: '165px',
      [theme.breakpoints.down('sm')]: {
        width: '145px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '85%',
        marginBottom: 5,
      },
    },
    checkboxMobileDivider: {
      height: '1px',
      background: '#C4C4C4',
      width: '100%',
    },
    formGroup: {
      margin: '0 0 55px 0',
      width: '100%',
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
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
    allCheckedFalse: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 500,
      color: '#000000',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
      [theme.breakpoints.down('xs')]: {
        fontWeight: 500,
      },
    },

    labelChecked: {
      height: '30px',
      margin: '0 0 0 -8px',
      '& .MuiTypography-body1': {
        fontFamily: 'Raleway',
        fontWeight: 700,
      },
    },
    labelUnchecked: {
      height: '30px',
      margin: '0 0 0 -8px',
      '& .MuiTypography-body1': {
        fontFamily: 'Raleway',
        fontWeight: 500,
      },
    },
  }),
  { name: 'CheckboxLeftsideFilterForm' },
);
