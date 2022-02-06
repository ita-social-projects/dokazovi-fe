import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  imgContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  imageFrame: {
    maxWidth: '100%',
    // height: '240px',
  },
  deleteButton: {
    position: 'absolute',
    backgroundColor: theme.palette.common.black,
    borderRadius: 0,
    right: 0,
    width: '45px',
    height: '45px',
    '&:hover': {
      backgroundColor: '#d5320b',
    },
  },
  deleteIcon: {
    fontSize: '37px',
  },
  swalContainer: {
    '& .swal2-popup': {
      width: '480px',
    },
  },
  swalText: {
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '28px',
  },
  swalButtonConfirm: {
    padding: '12px 40px',
    borderRadius: '6px',
    backgroundColor: '#13829a',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#106ba3',
      cursor: 'pointer',
    },
  },
  swalButtonCancel: {
    padding: '12px 40px',
    borderRadius: '6px',
    backgroundColor: '#e8522e',
    marginLeft: '30px',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#af391d',
      cursor: 'pointer',
    },
  },
  requiredField: {
    '&::before': {
      content: '"*"',
      color: 'red',
      display: 'inline',
      fontSize: '27px',
    },
  },
  addImage: {
    marginBottom: theme.spacing(1),
  },
}));
