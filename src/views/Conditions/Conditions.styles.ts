import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},

    section: {
      marginBottom: '100px',
    },

    wrap: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
    },

    title: {
      fontSize: '24px',
      lineHeight: '28px',
    },

    nav: {
      display: 'flex',
      marginBottom: '80px',
      listStyle: 'none',
      '& :not(:last-child)': {
        marginRight: '20px',
      },
    },
    link: {
      color: '#2F80ED',
      fontFamily: 'Raleway',
      fontWeight: 500,
      lineHeight: '16px',
      textDecoration: 'underline',
    },
    linkSelected: {
      color: '#000000',
      fontWeight: 700,
      textDecoration: 'none',
    },

    icon: {
      cursor: 'pointer',
    },
  }),
  { name: 'ConditionsView' },
);
