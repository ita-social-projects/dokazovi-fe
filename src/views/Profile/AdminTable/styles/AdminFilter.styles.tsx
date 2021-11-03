import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterHeader: {
    borderRadius: '1rem',
    textDecoration: 'none',
    backgroundColor: theme.palette.common.white,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '& > div': {
      backgroundColor: 'none',
    },
    '& .MuiSvgIcon-root': {
      top: 'calc(50% - 0.5em)',
      color: theme.palette.common.black,
    },
    '& .MuiSelect-root': {
      fontFamily: 'Raleway',
      fontWeight: '600',
      paddingLeft: '0.5rem',
      paddingRight: '1.5rem',
    },
  },
  filterCounter: {
    backgroundColor: theme.palette.common.black,
    color: 'white',
    borderRadius: '1rem',
    marginLeft: 7,
    padding: '1px 1rem',
  },
}));
