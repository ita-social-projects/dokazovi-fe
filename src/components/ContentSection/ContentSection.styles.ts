import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    section: {
      marginBottom: '100px',
      [theme.breakpoints.down('xs')]: {
        background: '#F1F1F1',
        padding: '50px 10px 0',
        marginBottom: 0,
      },
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

    icon: {
      cursor: 'pointer',
    },

    content: {
      ...theme.typography.body1,
      '& p': {
        marginBottom: theme.spacing(8),
        fontFamily: 'Literata',
        fontWeight: 400,
        fontSize: '17px',
        lineHeight: 1.53,
        [theme.breakpoints.down('xs')]: {
          marginBottom: 0,
          paddingBottom: theme.spacing(4),
          fontSize: '20px',
        },
      },
      '& h2': {
        marginBottom: theme.spacing(5),
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: 1.17,
        [theme.breakpoints.down('xs')]: {
          fontSize: '24px',
        },
      },
      '& h3': {
        marginBottom: theme.spacing(4),
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '19px',
        lineHeight: 1.17,
      },
      '& h4': {
        marginBottom: theme.spacing(14),
        fontFamily: 'Raleway',
        fontWeight: 500,
        fontSize: '19px',
        color: ' #767676',
        lineHeight: 1.47,
      },
      '& h5': {
        fontFamily: 'Literata',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.86,
      },
      '& a': {
        fontFamily: 'Literata',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.86,
        textDecoration: 'underline',
        color: '#0000ff',
        [theme.breakpoints.down('xs')]: {
          fontSize: '20px',
          fontStyle: 'normal',
          color: '#006DFF',
        },
      },
      '& strong': {
        [theme.breakpoints.down('xs')]: {
          fontFamily: 'Raleway',
          fontWeight: 700,
        },
      },
      '& blockquote': {
        marginBottom: theme.spacing(8),
        padding: '45px 110px',
        textAlign: 'center',
        fontFamily: 'Raleway, normal, sans-serif',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: 1.33,
        color: '#ff5c00',
        borderTop: '#4fdfff solid 1px',
        borderBottom: '#4fdfff solid 1px',
      },
      '& ol': {
        marginBottom: theme.spacing(8),
        paddingLeft: theme.spacing(5),
        fontFamily: 'Literata',
        fontSize: '17px',
        lineHeight: 1.65,
      },
      '& ul': {
        marginBottom: theme.spacing(8),
        paddingLeft: theme.spacing(5),
        fontFamily: 'Literata',
        fontSize: '17px',
        lineHeight: 1.65,
        [theme.breakpoints.down('xs')]: {
          fontSize: '20px',
        },
      },
      '& img': { width: '855px' },
      '& figcaption': {
        marginTop: theme.spacing(2),
        fontFamily: 'Literata',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1,
        color: '#767676',
      },
    },
  }),
  { name: 'ContentSection' },
);
