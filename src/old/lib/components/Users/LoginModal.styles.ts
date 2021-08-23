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
  forgotPasswordText: {
    color: '#6577B3 ',
    marginTop: theme.spacing(3),
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
}));
