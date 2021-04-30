import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
      width: '315px',
    },
    authorFullName: {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '21px',
      marginBottom: theme.spacing(-1),
    },
    header: {
      display: 'flex',
      height: 280,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(6),
      marginBottom: theme.spacing(6),
      '&>div': {
        height: '100%',
      },
    },
    body: {
      padding: theme.spacing(0, 6, 0, 5),
    },
    textHeader: {
      wordWrap: 'break-word',
      fontSize: '24px',
      lineHeight: '28px',
      marginBottom: theme.spacing(2.4),
      color: theme.palette.common.white,
    },
    textBody: {
      wordWrap: 'break-word',
      marginBottom: theme.spacing(5),
    },
    postType: {
      color: theme.palette.common.white,
    },
  }),
  {
    name: 'Style3PostPreviewCard',
  },
);
