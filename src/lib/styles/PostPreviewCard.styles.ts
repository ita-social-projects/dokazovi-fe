import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
    },
    avatar: {
      height: 91,
      width: 91,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      filter: 'grayscale(100%)',
    },
    header: {
      display: 'flex',
      margin: theme.spacing(0, 4),
    },
    body: {
      margin: theme.spacing(1, 4, 5),
    },
    postType: {
      color: theme.palette.info.light,
    },
    content: {
      padding: 0,
    },
    eyeIcon: {
      fill: theme.palette.text.secondary,
    },
    viewsCount: {
      width: '23px',
      height: '13px',
      marginLeft: theme.spacing(2),
    },
  }),
  {
    name: 'PostPreviewCard',
  },
);
