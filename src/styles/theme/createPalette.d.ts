/* eslint-disable */
import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom: PaletteOptions['primary'];
  }
}
