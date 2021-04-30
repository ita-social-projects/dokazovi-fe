import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  personalInfo: {
    marginBottom: '20px',
  },
  divider: {
    marginBottom: '20px',
  },
  avatar: {
    margin: '0 20px 20px 0',
    width: '240px',
    height: '240px',
  },
  directionList: {
    '& *': {
      marginRight: '4px',
    },
  },
}));
