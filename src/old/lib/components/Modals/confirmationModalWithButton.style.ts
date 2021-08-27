import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogTitleContainer: {
    paddingBottom: theme.spacing(7),
    width: '480px',
    wordBreak:'break-word',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '30px',
  },
  btnContainer: {
    paddingBottom: theme.spacing(4),
  },
  btn: {
    padding: '12px 40px',
    borderRadius: '6px',
    color: theme.palette.common.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  btnConfirm: {
    backgroundColor: '#13829a',
    '&:hover': {
      backgroundColor: '#106ba3',
    },
  },
  btnCancel: {
    backgroundColor: '#e8522e',
    marginLeft: theme.spacing(11),
    '&:hover': {
      backgroundColor: '#af391d',
    },
  },
}));
