import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  autorBlock: {
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
  direction: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px',
  },
  title: {
    textAlign: 'center',
  },
  createdAt: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px',
  },
  content: {
    margin: '20px',
  },
});
