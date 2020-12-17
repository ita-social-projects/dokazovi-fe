import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    header: {
      display: 'flex',
      margin: 10,
    },
    icon: {
      width: 75,
      height: 75,
      marginRight: 10,
    },
    moreExperts: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      cursor: 'pointer',
      marginTop: 20,
    },
    courseTitle: {
      marginLeft: '22px',
      fontSize: '30px',
      fontWeight: 400,
    },
  },
  {
    name: 'DirectionView',
  },
);
