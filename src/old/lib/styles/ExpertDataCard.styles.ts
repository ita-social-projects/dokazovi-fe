import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      minWidth: 275,
      minHeight: 210,
    },
    pos: {
      marginBottom: 12,
      cursor: 'pointer',
    },
    name: {
      cursor: 'pointer',
    },
  },
  {
    name: 'ExpertDataCard',
  },
);
