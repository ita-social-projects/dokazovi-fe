import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(4),
    minWidth: 0,
    padding: 0,
  },
  submitButton: {
    padding: '16px 44px',
    borderRadius: 50,
    marginRight: '0px',
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
  icon: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  label: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(4),
  },
  dialogTitle: {
    height: 60,
    backgroundColor: theme.palette.common.black,
  },
  titleContainer: {
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
  form: {
    width: '432px',
    height: 'fit-content',
    padding: '45px 15px 35px 15px',
    position: 'relative',
  },
  emailInput: {
    paddingBottom: 20,
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '30px 0 15px 0',
    '& .MuiTypography-body1': {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '18px',
    },
  },
  error: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '22px',
    color: '#FF0707',
    marginTop: 20,
  },
  doneIcon: {
    position: 'absolute',
    left: 12,
    bottom: 63,
    color: 'black',
    fontSize: 30,
  },
  closeIconButton: {
    width: 40,
    height: 40,
  },
  closeIcon: {
    color: '#A7A7A7',
    fontSize: 45,
  },
  visibilityIconButton: {
    padding: 0,
  },
  visibilityIcon: {
    fontSize: 34,
    color: 'black',
  },
}));
