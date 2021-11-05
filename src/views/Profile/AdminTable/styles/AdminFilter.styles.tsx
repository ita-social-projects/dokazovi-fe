import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterHeader: {
    borderRadius: '1rem',
    textDecoration: 'none',
    backgroundColor: theme.palette.common.white,
    marginLeft: '0.4rem',
    marginRight: '0.4rem',
    borderWidth: theme.spacing(0.2),
    borderStyle: 'solid',
    borderColor: theme.palette.common.black,
    boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 2px',

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
    color: theme.palette.common.white,
    borderRadius: '1rem',
    marginLeft: 7,
    padding: '1px 1rem',
  },
}));
