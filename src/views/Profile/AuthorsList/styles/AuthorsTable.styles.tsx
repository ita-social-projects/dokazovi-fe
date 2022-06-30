import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  editButton: {
    padding: '0px 5px',
    color: 'green',
  },
  deleteButton: {
    padding: '0px 5px',
    color: 'red',
  },
}));
