import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
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
    },
    link: { textDecoration: 'underline' },
    postTitle: {
      color: '#767676',
      fontSize: 'inherit',
    },
  },
  { name: 'BasicBreadcrumbs' },
);
