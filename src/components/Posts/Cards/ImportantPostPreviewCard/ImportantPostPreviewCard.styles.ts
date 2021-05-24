import { makeStyles, Theme } from '@material-ui/core';

interface IStyleProps {
  backgroundImageUrl: string;
}

export const useStyles = makeStyles<Theme, IStyleProps>(
  (theme) => ({
    root: (props) => ({
      height: 455,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(14, 5, 11, 11),
      backgroundImage: `url(${props.backgroundImageUrl})`,
      backgroundSize: 'cover',
      color: theme.palette.common.white,
    }),
    title: {
      maxWidth: 715,
      marginBottom: theme.spacing(5),
      cursor: 'pointer',
      color: 'inherit',
      fontSize: '40px',
      lineHeight: '50px',
    },
    preview: {
      maxWidth: 425,
      cursor: 'pointer',
      color: 'inherit',
      lineHeight: '22px',
    },
    authorsDetails: {
      maxWidth: 470,
      marginBottom: theme.spacing(7),
      color: 'inherit',
    },
    authorsName: {
      maxWidth: 275,
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
      color: 'inherit',
      fontSize: '20px',
      lineHeight: '23px',
    },
  }),
  {
    name: 'ImportantPostPreviewCard',
  },
);
