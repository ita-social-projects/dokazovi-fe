import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
  },
  label: {},
  dots: {
    top: -40,
    height: 20,
    '& li ': {
      lineHeight: '18px',
      fontSize: 16,
      fontWeight: 500,
      height: 'auto',
      width: 'auto',
      color: theme.palette.text.secondary,
    },
    '& li.slick-active': {
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(1),
      borderBottom: 'solid 2px',
    },
  },
}));
