import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.black,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '292px',
    maxWidth: '1180px',
    margin: '0 auto',
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
    '& a:first-child': {
      fontSize: '26px',
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 400,
    lineHeight: '20px',
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
}));
