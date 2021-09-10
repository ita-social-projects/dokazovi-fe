import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
    },
    avatar: {
      height: 95,
      width: 95,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(3),
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
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(3),
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(6),
    },
    textHeader: {
      wordWrap: 'break-word',
      fontSize: '24px',
      lineHeight: '28px',
      marginBottom: theme.spacing(2.4),
    },
    textBody: {
      wordWrap: 'break-word',
      marginBottom: theme.spacing(5),
    },
    postType: {
      color: '#60B3CD',
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '10px',
      lineHeight: '17px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    content: {
      padding: 0,
    },
  }),
  {
    name: 'ExpertOpinionPostPreviewCard',
  },
);
