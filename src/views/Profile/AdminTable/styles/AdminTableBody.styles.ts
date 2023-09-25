import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    titleCol: {
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
    title: {
      maxWidth: '250px',
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
      wordWrap: 'break-word',
      width: 'fit-content',
      display: 'block',
    },
    default: {
      backgroundColor: theme.palette.background.default,
    },
    article: {
      backgroundColor: '#987d7c',
    },
    video: {
      backgroundColor: '#968ac2',
    },
    post: {
      backgroundColor: '#a3c9ad',
    },
  }),
  { name: 'AdminTableBody' },
);
