import { createContext } from 'react';

interface IAuthContext {
  authenticated: boolean;
  setAuthorization: (token: string) => void;
  removeAuthorization: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  setAuthorization: () => {},
  removeAuthorization: () => {},
});
