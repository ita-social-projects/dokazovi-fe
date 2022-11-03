/* eslint-disable */

import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    custom: {
      colorAquaBlue?: string;
    };
  }
  interface Palette {
    custom: {
      colorAquaBlue?: string;
    };
  }
}
