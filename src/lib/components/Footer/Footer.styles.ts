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
    innerNav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      width: '700px',
      '& span': {
        color: theme.palette.common.white,
      },
      '& a:not(:first-child)': {
        fontWeight: 500,
      },
      '& a:first-child': {
        fontSize: '26px',
        lineHeight: '26px',
        fontWeight: 700,
      },
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 400,
      lineHeight: '18px',
      align: 'left',
      '& span': {
        color: theme.palette.common.white,
      },
    },
    outerNav: {
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
    infoButtom: {
      fontWeight: 500,
    },
  }),
  { name: 'Footer' },
);
