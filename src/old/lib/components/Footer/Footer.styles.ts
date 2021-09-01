import makeStyles from '@material-ui/core/styles/makeStyles';
import { IFooterStyleProps } from '../../types';

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      backgroundColor: theme.palette.common.black,
      zIndex: (props: IFooterStyleProps) =>
        props.isAdminPage || props.isProfilePage ? 1201 : 'auto',
    },
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '240px',
      margin: '0 auto',
      position: 'relative',
      padding: theme.spacing(11, 10, 12),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(11, 5, 12),
      },
      color: theme.palette.common.white,
    },
    columnContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    navigationContainer: {
      display: 'flex',
      alignItems: 'baseline',
      '& span': {
        lineHeight: '26px',
        color: theme.palette.common.white,
      },
    },
    navigationLinks: {
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: theme.spacing(0, 8),
      alignItems: 'baseline',
      '& span': {
        fontFamily: 'Raleway',
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '18px',
      },
      '& a': {
        margin: theme.spacing(0, 3),
      },
      '& a:hover': {
        textDecoration: 'underline',
      },
    },
    info: {
      display: 'flex',
      minHeight: '56px',
      flexDirection: 'column',
      '& span': {
        color: theme.palette.common.white,
        fontSize: '13px',
      },
    },
    companyLabel: {
      '& ul': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      '& ul li': {
        listStyle: 'none',
        lineHeight: '32px',
      },
      '& ul li:not(:last-child)': {
        marginRight: theme.spacing(8),
      },
      '& ul li img': {
        verticalAlign: 'middle',
      },
    },
  }),
  { name: 'Footer' },
);
