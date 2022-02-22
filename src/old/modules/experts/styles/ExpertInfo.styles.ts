import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      padding: '10px 0 0',
      marginBottom: 0,
    },
  },
  personalInfo: {
    margin: '0 0 20px 0',
    [theme.breakpoints.down('xs')]: {
      // marginTop: theme.spacing(16),
      padding: '10px 0 0',
      marginBottom: 0,
    },
  },
  avatarSection: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-start',
    },
  },
  avatar: {
    margin: '0 0 40px 0',
    width: '100%	',
    height: '280px',
    [theme.breakpoints.down('xs')]: {
      width: 87,
      height: 87,
      marginRight: '20px',
    },
  },
  fullName: {
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      marginBottom: '5px',
    },
  },
  bio: {
    marginBottom: '80px',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '40px',
      fontSize: '14px',
      fontStyle: 'italic',
      lineHeight: '1.43',
    },
  },
  accordionWrapper: {
    marginBottom: '50px',
  },
}));
