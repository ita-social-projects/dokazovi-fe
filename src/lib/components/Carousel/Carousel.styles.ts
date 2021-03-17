import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dots: {
    bottom: 10,
    textAlign: 'right',
    right: 10,
    '& li.slick-active button::before': {
      color: theme.palette.common.white,
      content: "'\u2022'",
      fontSize: 13,
      marginTop: theme.spacing(1),
      opacity: 1,
    },
    '& li': {
      margin: theme.spacing(0, 0.5),
      '& button:before': {
        content: "'\u25EF'",
        color: theme.palette.common.white,
        opacity: 1,
      },
      '& button::before': {
        fontSize: 18,
      },
    },
  },
}));
