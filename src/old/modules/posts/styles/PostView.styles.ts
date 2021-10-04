import { makeStyles, Theme } from '@material-ui/core';

interface IStyleProps {
  isTopSectionShown: boolean;
}

export const useStyles = makeStyles<Theme, IStyleProps>(
  (theme: Theme) => ({
    cardContainer: {
      position: 'relative',
      minHeight: '550px',
      padding: '70px 225px 150px',
      wordBreak: 'break-word',
      [theme.breakpoints.down('xs')]: {
        padding: '15px',
        minHeight: '812px',
      },
    },

    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },

    actionsBlock: {
      display: 'flex',
      marginLeft: 'auto',
      alignItems: 'center',
    },
    contentRoot: (props) => ({
      minHeight: '550px',
      flexDirection: 'column',

      '& h1': {
        marginTop: theme.spacing(14),
        marginBottom: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
          marginTop: props.isTopSectionShown
            ? theme.spacing(6)
            : theme.spacing(16),
          marginBottom: theme.spacing(6),
          fontSize: '32px',
          lineHeight: '1,19',
        },
      },
    }),

    createdAt: {
      color: theme.palette.info.light,
    },
    video: {
      width: '72vw',
      height: '100vh',
      margin: '20px -225px 70px',
      borderBottom: '1px solid #767676',
    },
    iconBlack: {
      color: 'black',
    },
    content: {
      ...theme.typography.body1,
      '& p': {
        marginBottom: 0,
        fontFamily: 'Literata',
        fontWeight: 400,
        fontSize: '17px',
        lineHeight: 1.53,
      },
      '& h2': {
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: 1.17,
        marginTop: theme.spacing(14),
      },
      '& h3': {
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '19px',
        lineHeight: 1.17,
        marginTop: theme.spacing(14),
      },
      '& h4': {
        fontFamily: 'Raleway',
        fontWeight: 500,
        fontSize: '19px',
        color: ' #767676',
        lineHeight: 1.47,
        marginTop: theme.spacing(8),
      },
      '& h5': {
        fontFamily: 'Literata',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.86,
        marginTop: theme.spacing(8),
      },
      '& a': {
        fontStyle: 'italic',
        textDecoration: 'underline',
        color: '#0000ff',
      },
      '& blockquote': {
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
        paddingLeft: theme.spacing(5),
        fontFamily: 'Literata',
        fontSize: '17px',
        lineHeight: 1.65,
      },
      '& ul': {
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
