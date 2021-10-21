import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterHeader: {
    borderRadius: '1rem',
    textDecoration: 'none',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& > div': {
      backgroundColor: 'none',
    },
    padding: '2px 3px 0 10px',
  },
  filterCounter: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '1rem',
    marginLeft: 7,
    padding: '1px 1rem',
  },
}));
