import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    cardContainer: {
      minHeight: '550px',
      padding: '70px 225px 150px 225px',
    },
    wrapper: {
      width: '855px',
      display: 'flex',
      flexDirection: 'column',
    },
    authorBlock: {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      height: 130,
      width: 130,
      marginRight: theme.spacing(4),
      borderRadius: '50%',
      filter: 'grayscale(100%)',
    },
    actionsBlock: {
      display: 'flex',
      marginLeft: 'auto',
      alignItems: 'center',
    },
    contentRoot: {
      minHeight: '550px',
      flexDirection: 'column',
      '& h1': {
        marginBottom: theme.spacing(10),
      },
    },
    createdAt: {
      color: theme.palette.info.light,
    },

    content: {
      ...theme.typography.body1,

      '& p': {
        marginBottom: theme.spacing(9),
        fontFamily: 'Literata',
        fontWeight: 400,
        fontSize: '17px',
        lineHeight: 1.53,
      },

      '& h2': {
        marginBottom: theme.spacing(5),
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: 1.17,
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
        fontSize: '17px',
        lineHeight: 1.53,
        textDecoration: 'underline',
        color: '#0000ff',
      },
      '& blockquote': {
        marginBottom: theme.spacing(9),
        // margin: '45px 0px',
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
        marginBottom: theme.spacing(9),
        paddingLeft: theme.spacing(5),
        fontFamily: 'Literata',
        fontSize: '17px',
        lineHeight: 1.65,
      },
      '& ul': {
        marginBottom: theme.spacing(9),
        paddingLeft: theme.spacing(5),
        fontFamily: 'Literata',
        fontSize: '17px',
        lineHeight: 1.65,
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
  { name: 'PostView' },
);
