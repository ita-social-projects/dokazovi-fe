import { makeStyles, Theme } from '@material-ui/core';

export interface IStyleProps {
  backgroundImageUrl: string;
}

export const useStyles = makeStyles<Theme, IStyleProps>(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
      width: '315px',
      [theme.breakpoints.down('xs')]: {
        width: '94vw',
      },
    },
    header: (props) => ({
      display: 'flex',
      height: 182,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      padding: theme.spacing(4, 6, 0, 5),
      marginBottom: theme.spacing(6),
      backgroundImage: props.backgroundImageUrl,
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
  }),
  {
    name: 'MediaPostPreviewCard',
  },
);
