import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      width: 280,
      borderRadius: 0,
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
      margin: theme.spacing(0, 4),
      cursor: 'pointer',
    },
    body: {
      margin: theme.spacing(1, 4, 5),
      cursor: 'pointer',
    },
    postType: {
      color: theme.palette.info.light,
    },
    authorTypography: {
      fontSize: '16px',
      lineHeight: '19px',
    },
    content: {
      padding: 0,
    },
    eyeNumber: {
      color: theme.palette.text.secondary,
      marginLeft: '6px',
      fontSize: '9px',
      lineHeight: '11px',
    },
    eyeIcon: {
      width: '23px',
      height: '13px',
      marginLeft: '-3px',
      color: '#6D6E71',
    },
  }),
  {
    name: 'PostPreviewCard',
  },
);
