import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  cardContainer: {
    marginTop: '20px',
    minHeight: '550px',
  },
  authorBlock: {
    minHeight: '100px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    margin: '20px 0 0 20px',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%),',
  },
  avatar: {
    marginRight: '20px',
    width: '30px',
  },
  directions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px',
  },
  direction: {
    marginRight: '5px',
  },
  title: {
    textAlign: 'center',
  },
  contentRoot: {
    position: 'relative',
    minHeight: '550px',
  },
  createdAt: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: '20px',
    marginBottom: '20px',
  },
  content: {
    margin: '20px',
    '& h1': {
      fontSize: '2em',
    },
    '& h2': {
      fontSize: '1.5em',
    },
  },
});
