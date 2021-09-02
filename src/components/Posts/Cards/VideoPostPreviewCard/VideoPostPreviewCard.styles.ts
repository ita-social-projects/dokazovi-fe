import { makeStyles, Theme } from '@material-ui/core';
import play from '../../../../assets/images/play.png';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      borderRadius: 0,
      width: '315px',
    },
    header: {
      display: 'flex',
      height: 182,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      marginBottom: theme.spacing(6),
    },
    play: {
      position: 'absolute',
      height: 40,
      width: 40,
      background: `${theme.palette.common.black}`,
      '&::after': {
        content: "''",
        display: 'block',
        height: 40,
        width: 40,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${play})`,
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
      color: theme.palette.common.black,
    },
    textBody: {
      wordWrap: 'break-word',
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      root: {
        width: '94vw',
      },
    },
  }),
  {
    name: 'VideoPostPreviewCard',
  },
);
