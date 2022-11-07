/* eslint-disable */

import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Custom {
    colorAquaBlue?: string;
  }
  export interface PaletteOptions {
    custom: Custom;
  }
  export interface Palette {
    custom: Custom;
  }
}
