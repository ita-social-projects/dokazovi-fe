import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: '20px',
    padding: '12px 40px',
    borderRadius: '6px',
    color: theme.palette.common.white,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  btnCancel: {
    backgroundColor: '#e8522e',
    '&:hover': {
      backgroundColor: '#af391d',
    },
  },
}));
