import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterHeader: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '1rem',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& > div': {
      backgroundColor: 'none',
    },
    padding: '0 10px',
  },
}));
