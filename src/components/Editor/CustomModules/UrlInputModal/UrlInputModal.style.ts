import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButtonText: {
    '& .MuiIconButton-label': {
      fontSize: '16px',
      color: theme.palette.common.black,
    },
    '& .MuiIconButton-label:hover': {
      color: '#06c',
    },
  },
  root: {
    backgroundColor: '#eee',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    marginTop: '20px',
    width: '500px',
    '&:hover': {
      color: '#06c',
    },
    '&:hover .MuiSvgIcon-root': {
      fill: '#06c',
    },
  },
  icon: {
    marginTop: '-15px',
    marginBottom: '-5px',
    color: theme.palette.common.black,
    fontSize: '50px',
  },
  imgInputText: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '22px',
  },
}));
