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
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '240px',
      margin: '0 auto',
      position: 'relative',
      padding: theme.spacing(11, 10, 12),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(6, 5, 6, 7),
        minHeight: '274px',
      },
      [theme.breakpoints.down(376)]: {
        padding: theme.spacing(6, 5, 6, 7),
        minHeight: '248px',
      },
      color: theme.palette.common.white,
    },
    rowContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        '&:last-child': {
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      },
    },
    navigationContainer: {
      display: 'flex',
      alignItems: 'baseline',
      '& span': {
        lineHeight: '26px',
        color: theme.palette.common.white,
      },
      [theme.breakpoints.down('xs')]: {
        '& span': {
          fontSize: '22px',
        },
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
      '&:first-child': {
        width: '60%',
      },
      [theme.breakpoints.down('xs')]: {
        minHeight: '0',
        '& span': {
          fontSize: '14px',
          lineHeight: '18px',
        },
        '&:first-child': {
          marginTop: theme.spacing(4),
          width: '100%',
        },
      },
      [theme.breakpoints.down(376)]: {
        '& span': {
          fontSize: '12px',
          lineHeight: '16px',
        },
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
      [theme.breakpoints.down('xs')]: {
        '& ul li:not(:last-child)': {
          marginRight: theme.spacing(3),
        },
        '& ul li': {
          lineHeight: '24px',
        },
        '& ul li:first-child img': {
          height: '4vw',
        },
        '& ul li:last-child img': {
          marginRight: theme.spacing(2),
          height: '3.5vw',
        },
      },
    },
  }),
  { name: 'Footer' },
);
