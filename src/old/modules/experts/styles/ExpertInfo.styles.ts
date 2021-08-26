import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  personalInfo: {
    margin: '0 0 20px 0',
  },
  avatar: {
    margin: '0 0 40px 0',
    width: '280px',
    height: '280px',
  },
  fullName: {
    width: '280px',
    marginBottom: '20px',
  },
  bio: {
    width: '280px',
    marginBottom: '80px',
    textAlign: 'left',
  },
  accordionWrapper: {
    width: '280px',
    marginBottom: '50px',
  },
}));
