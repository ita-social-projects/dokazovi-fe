import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      borderRadius: 0,
      marginBottom: theme.spacing(3),
    },
  }),
  {
    name: 'ExpertPhotoDataCard',
  },
);
