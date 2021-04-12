import { createMuiTheme, Theme } from '@material-ui/core';
import { PALETTE as palette } from './palette';
import { TYPOGRAPHY as typography } from './typography';

export const MAIN_THEME = createMuiTheme({
  palette,
  typography,
  spacing: 5,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1320,
      xl: 1920,
    },
  },
  shadows: Array<string>(25).fill('none') as Theme['shadows'],
  overrides: {
    MuiButton: {
      root: {
        boxShadow: 'none',
        borderRadius: 0,
        textTransform: 'none',
      },
    },
  },
});
