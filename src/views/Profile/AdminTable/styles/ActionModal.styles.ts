import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogTitleContainer: {
    paddingBottom: theme.spacing(7),
    width: theme.spacing(100),
    wordBreak: 'break-word',
  },
  modalText: {
    textAlign: 'center',
    ...theme.typography.h5,
  },
  btnContainer: {
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    padding: theme.spacing(2.4, 8),
    borderRadius: theme.spacing(1.2),
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
