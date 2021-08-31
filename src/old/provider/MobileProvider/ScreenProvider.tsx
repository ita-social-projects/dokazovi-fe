import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { ScreenContext } from './ScreenContext';

export const ScreenProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const tablet = !useMediaQuery(theme.breakpoints.up('md'));
return(
  <ScreenContext.Provider value={{ mobile,tablet }}>{children}</ScreenContext.Provider>
);
};
