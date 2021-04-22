import { createContext } from 'react';

interface IAuthContext {
  authenticated: boolean;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  setToken: () => {},
  removeToken: () => {},
});
