import { createMuiTheme } from '@material-ui/core';
import { palette } from './palette';
import { typography } from './typography';

export const mainTheme = createMuiTheme({
  palette,
  typography,
  spacing: [5, 10, 15, 20, 25, 30, 35, 40, 55, 65, 75, 80],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
