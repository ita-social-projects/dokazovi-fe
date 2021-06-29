import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(4),
    minWidth: 0,
    padding: 0,
  },
  icon: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  label: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(4),
  },
  dialogContainer: {
    position: 'relative',
  },
  dialogTitleContainer: {
    height: 60,
    backgroundColor: theme.palette.common.black,
  },
  dialogTitleBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
  },
  dialogTitleText: {
    color: theme.palette.common.white,
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 22,
    wordSpacing: 4,
  },
  closeIconButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 7,
    top: 6,
  },
  closeIcon: {
    color: '#A7A7A7',
    fontSize: 50,
  },
  form: {
    width: '432px',
    height: 'fit-content',
    padding: '20px 15px 35px 15px',
    position: 'relative',
  },
  textInput: {
    marginTop: 35,
    '& .MuiInputBase-input': {
      fontFamily: 'Raleway',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 22,
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Raleway',
      fontSize: 13,
      paddingTop: 3,
    },
  },
  visibilityIconButton: {
    padding: 0,
  },
  visibilityIcon: {
    fontSize: 34,
    color: 'black',
  },
  error: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '22px',
    color: '#FF0707',
    marginTop: 20,
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '40px 0 10px 0',
    '& .MuiTypography-body1': {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '18px',
    },
  },
  uncheckedIcon: {
    width: 20,
    height: 20,
    borderRadius: 3,
    border: 'solid 2px #CCCCCC',
  },
  checkedIcon: {
    backgroundColor: '#4FDFFF',
    borderRadius: 3,
    display: 'block',
    width: 20,
    height: 20,
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
    '&:before': {
      width: 22,
      height: 8,
      display: 'block',
      content: "''",
      position: 'relative',
      borderBottom: '4px solid #000000',
      borderLeft: '4px solid #000000',
      transform: 'rotate(-45deg)',
      left: 2,
      top: 2,
    },
  },
  submitButton: {
    padding: '16px 44px',
    borderRadius: 50,
    marginRight: 0,
    alignSelf: 'flex-end',
    backgroundColor: '#FF5C00',
    '& .MuiButton-label': {
      color: theme.palette.common.white,
      fontWeight: 700,
      fontSize: '18px',
      fontFamily: 'Raleway',
    },
    '&:hover': {
      backgroundColor: '#ffaa00',
    },
  },
  congratulationContainer: {
    '& .swal2-popup': {
      width: 480,
    },
  },
  congratulationTitleText: {
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '64px',
    lineHeight: '66px',
    marginTop: '-25px', // -15px and -35px, without 90px
  },
  congratulationSubText: {
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '38px',
    padding: '0 -20px',
    marginTop: '-22px',
  },
  congratulationButton: {
    padding: '14px 60px',
    borderRadius: 50,
    backgroundColor: '#4FDFFF',
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: '18px',
    fontFamily: 'Raleway',
    margin: '10px 0 60px 0', // '10px 0 40px or 60px 0' bottom, without '18px 0 71px 0'
    '&:hover': {
      backgroundColor: '#106ba3',
      cursor: 'pointer',
    },
  },
}));
