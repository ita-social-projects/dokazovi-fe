import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      height: 265,
    },
    media: {
      height: 58,
      width: 46,
      padding: 15,
      paddingLeft: 13,
    },
    header: {
      display: 'flex',
      margin: '15px 15px 0 15px',
      cursor: 'pointer',
    },
    body: {
      margin: '15px',
      cursor: 'pointer',
    },
  },
  {
    name: 'PostPreviewCard',
  },
);
