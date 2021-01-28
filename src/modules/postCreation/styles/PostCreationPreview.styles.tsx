import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    display: 'flex',
  },
  buttonHolder: {
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '10px',
    marginRight: '13px',
    marginLeft: '13px',
    padding: '10px',
  },
});
