import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      minWidth: 275,
      minHeight: 210,
    },
    pos: {
      marginBottom: 12,
    },
    photo: {
      maxWidth: 200,
      maxHeight: 200,
      objectFit: 'cover',
    },
  },
  {
    name: 'ExpertPhotoDataCard',
  },
);
