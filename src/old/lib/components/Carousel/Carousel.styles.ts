import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dots: {
    bottom: 10,
    textAlign: 'right',
    right: 10,
    '& li button': {
      width: theme.spacing(3),
      height: theme.spacing(3),
      border: '2px solid',
      borderColor: theme.palette.common.white,
      borderRadius: '50%',
      '&::before': {
        content: 'none',
      },
    },
    '& li.slick-active button': {
      background: theme.palette.common.white,
    },
  },
  dotsMobile:{
    bottom: 30,
    textAlign: 'left',
    left: 30,
    '& li button': {
      width: theme.spacing(2),
      height: theme.spacing(2),
      border: '2px solid',
      borderColor: theme.palette.common.white,
      borderRadius: '50%',
      '&::before': {
        content: 'none',
      },
    },
    '& li.slick-active button': {
      background: theme.palette.common.white,
    },
  }
}));
