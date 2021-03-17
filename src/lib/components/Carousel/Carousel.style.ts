import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dots: {
    bottom: 10,
    textAlign: 'right',
    right: 10,
    '& li.slick-active button::before': {
      color: theme.palette.common.white,
      opacity: 0.8,
    },
    '& li': {
      '& button::before': {
        fontSize: 11,
        opacity: 0.4,
        color: theme.palette.common.white,
      },
    },
  },
}));
