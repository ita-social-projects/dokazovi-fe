import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    breadcrumbs: {
      fontFamily: 'Literata',
      fontStyle: 'italic',
      fontWeight: 'normal',
      fontSize: '11px',
      lineHeight: '28px',
      color: '#2F80ED',
      position: 'absolute',
      right: '30px',
      top: '20px',
      [theme.breakpoints.down('xs')]: {
        padding: '10px',
        top: 0,
        left: '20px',
        right: 0,
        fontSize: '10px',
      },
    },
    link: { textDecoration: 'underline' },
    postTitle: {
      color: '#767676',
      fontSize: 'inherit',
    },
  }),
  { name: 'BasicBreadcrumbs' },
);
