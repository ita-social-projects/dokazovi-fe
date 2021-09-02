import { makeStyles, Theme } from '@material-ui/core';

interface IStyleProps {
  backgroundImageUrl: string;
}

export const useStyles = makeStyles<Theme, IStyleProps>(
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
    header: (props) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 280,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(6),
      marginBottom: theme.spacing(6),
      backgroundImage: `url(${props.backgroundImageUrl})`,
      '&>div': {
        height: '100%',
      },
    }),
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
    filterLink: {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('xs')]: {
      root: {
        width: '94vw',
      },
    },
  }),
  {
    name: 'TranslationPostPreviewCard',
  },
);
