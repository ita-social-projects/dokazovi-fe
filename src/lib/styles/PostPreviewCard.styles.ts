import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
    },
    media: {
      height: 91,
      width: 91,
      padding: 15,
      paddingLeft: 13,
      filter: 'grayscale(100%)',
    },
    header: {
      display: 'flex',
      margin: '0 22px',
      cursor: 'pointer',
    },
    body: {
      margin: '5px 22px 25px',
      cursor: 'pointer',
    },
  },
  {
    name: 'PostPreviewCard',
  },
);
