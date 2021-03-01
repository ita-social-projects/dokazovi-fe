import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export const TYPOGRAPHY: TypographyOptions = {
  htmlFontSize: 16,
  fontFamily: ['Literata', 'Raleway', 'Helvetica', 'Roboto', 'sans-serif'].join(
    ',',
  ), // Roboto is used for testing
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '54px',
  },
  h2: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '22px',
    lineHeight: '26px',
  },
  h3: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
  },
  h4: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
  },
  subtitle1: {
    fontFamily: 'Literata',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '13px',
    lineHeight: '18px',
  },
  body1: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
  },
  body2: {
    fontFamily: 'Raleway',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
  },
  button: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
  },
  caption: {
    fontFamily: 'Literata',
    fontWeight: 200,
    fontSize: '14px',
    lineHeight: '24px',
  },
  subtitle2: {
    fontFamily: 'Lato',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '26px',
  },
  overline: {
    fontFamily: 'Lato',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '15px',
  },
};
