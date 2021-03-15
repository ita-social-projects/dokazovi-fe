import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export const TYPOGRAPHY: TypographyOptions = {
  htmlFontSize: 16,
  fontFamily: [
    'Literata',
    'Raleway',
    'Montserrat',
    'Helvetica',
    'Roboto',
    'sans-serif',
  ].join(','), // Roboto is used for testing
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '48px',
  },
  h2: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '38px',
  },
  h3: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '26px',
    lineHeight: '30px',
  },
  h4: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '22px',
    lineHeight: '26px',
  },
  h5: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '18px',
  },
  h6: {
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
  },
  subtitle1: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
  },
  subtitle2: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '17px',
  },
  body1: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
  },
  body2: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  button: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
    textTransform: 'none',
  },
  caption: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
  },
  overline: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.2em',
  },
};
