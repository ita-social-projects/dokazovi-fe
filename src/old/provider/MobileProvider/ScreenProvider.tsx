import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { ScreenContext } from './ScreenContext';

export const ScreenProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ScreenContext.Provider value={{ mobile, tablet }}>
      {children}
    </ScreenContext.Provider>
  );
};
