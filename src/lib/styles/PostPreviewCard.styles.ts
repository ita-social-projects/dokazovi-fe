import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      maxWidth: 300,
      position: 'relative',
    },
    media: {
      height: 58,
      width: 46,
      paddingTop: 13,
      paddingLeft: 13,
    },
  },
  {
    name: 'PostPreviewCard',
  },
);
