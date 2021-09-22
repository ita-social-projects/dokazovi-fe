import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
      width: '315px',
    },
    header: () => ({
      display: 'flex',
      height: 182,
      padding: theme.spacing(4, 6, 0, 5),
      marginBottom: theme.spacing(6),
      background: theme.palette.primary.main,
    }),
    body: {
      padding: theme.spacing(0, 6, 0, 5),
    },
    textHeader: {
      wordWrap: 'break-word',
      fontSize: '24px',
      lineHeight: '28px',
      marginBottom: theme.spacing(2.4),
      color: theme.palette.common.black,
    },
    textBody: {
      wordWrap: 'break-word',
      marginBottom: theme.spacing(5),
    },
    postType: {
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('xs')]: {
      root: {
        width: '94vw',
      },
    },
  }),
  {
    name: 'MediaPostPreviewCard',
  },
);
