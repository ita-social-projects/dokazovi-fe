import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterHeader: {
    borderRadius: '1rem',
    textDecoration: 'none',
    backgroundColor: theme.palette.common.white,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '& > div': {
      backgroundColor: 'none',
    },
    padding: '2px 3px 0 10px',
    '& .MuiSvgIcon-root': {
      top: 'calc(50% - 0.5em)',
      color: theme.palette.common.black,
    },
    '& .MuiSelect-select': {
      fontFamily: 'Raleway',
    },
  },
  filterCounter: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '1rem',
    marginLeft: 7,
    padding: '1px 1rem',
  },
}));
