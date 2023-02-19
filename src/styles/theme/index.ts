import { createTheme, Theme } from '@material-ui/core';
import { PALETTE as palette } from './palette';
import { TYPOGRAPHY as typography } from './typography';

export const SCREEN_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1355,
  xl: 1920,
};

export const MAIN_THEME = createTheme({
  palette,
  typography,
  spacing: 5,
  breakpoints: {
    values: SCREEN_BREAKPOINTS,
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
    MuiIconButton: {
      root: {
        color: 'initial',
      },
    },
  },
});
