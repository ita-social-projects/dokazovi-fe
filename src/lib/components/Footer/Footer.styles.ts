import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      backgroundColor: theme.palette.common.black,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '292px',
      margin: '0 auto',
      padding: theme.spacing(10, 0, 16),
      color: theme.palette.common.white,
    },
    navContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      width: '700px',
      '& span': {
        color: theme.palette.common.white,
      },
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      '& span': {
        color: theme.palette.common.white,
      },
    },
    socials: {
      '& ul': {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.common.white,
      },
      '& ul li:not(:first-child)': {
        listStyle: 'none',
        marginLeft: theme.spacing(2),
        lineHeight: '32px',
      },
      '& ul li img': {
        verticalAlign: 'middle',
      },
    },
  }),
  { name: 'Footer' },
);
