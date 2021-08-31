import { createContext } from 'react';

interface IScreenContext {
  mobile: boolean | null;
  tablet: boolean | null;
}

export const ScreenContext = createContext<IScreenContext>({
  mobile: null,
  tablet: null,
});
