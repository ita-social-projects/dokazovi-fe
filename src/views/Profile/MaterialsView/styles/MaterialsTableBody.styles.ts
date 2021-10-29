import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  titleCol: {
    width: '220px',
    maxWidth: '220px',
    overflowX: 'hidden',
    '& .MuiChip-root': {
      borderRadius: 0,
      marginBottom: '0.5rem',
      height: theme.spacing(4.4),
    },
    '& .MuiChip-label': {
      fontSize: '13px',
      fontFamily: 'Raleway',
    },
  },
}));
