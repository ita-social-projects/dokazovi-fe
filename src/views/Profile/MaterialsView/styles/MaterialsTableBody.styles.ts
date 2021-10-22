import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  titleCol: {
    width: '220px',
    maxWidth: '220px',
    overflowX: 'hidden',
    '& .MuiChip-root': {
      borderRadius: 0,
      marginBottom: '0.5rem',
      height: '20px',
    },
    '& .MuiChip-label': {
      fontSize: '13px',
      fontFamily: 'Raleway',
    },
  },
}));
