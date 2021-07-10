import { createContext } from 'react';

interface IAuthContext {
  authenticated: boolean;
  setAuthorization: (token: string) => void;
  removeAuthorization: () => void;
  checkPermission: (permission: string) => boolean;
}

export const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  setAuthorization: () => {},
  removeAuthorization: () => {},
  checkPermission: () => false,
});
