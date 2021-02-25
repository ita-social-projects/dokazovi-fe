import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
    },
    media: {
      height: 91,
      width: 91,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      filter: 'grayscale(100%)',
    },
    header: {
      display: 'flex',
      margin: `0 ${theme.spacing(4)}px`,
      cursor: 'pointer',
    },
    body: {
      margin: `${theme.spacing(1)}px ${theme.spacing(4)}px ${theme.spacing(
        5,
      )}px`,
      cursor: 'pointer',
    },
    postType: {
      color: '#3B6F95',
    },
    authorTypography: {
      fontSize: '16px',
      lineHeight: '19px',
    },
    content: {
      padding: '0',
    },
  }),
  {
    name: 'PostPreviewCard',
  },
);
