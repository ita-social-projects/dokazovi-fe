import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
