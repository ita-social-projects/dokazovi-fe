import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  filterSrction: {
    border: '3px solid',
    borderColor: theme.palette.primary.main,
    padding: '7px 30px 7px 30px',
    borderRadius: 'calc( 1rem + 10px )',
    marginBottom: '1rem',
  },
  clearButton: {
    padding: 0,
  },
}));
