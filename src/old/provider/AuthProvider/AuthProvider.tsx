import React, { useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthHook } from './useAuthHook';
import { getToken } from './getToken';

export const AuthProvider: React.FC = ({ children }) => {
  const token = getToken();
  const [
    authenticated,
    setAuthorization,
    removeAuthorization,
    checkPermission,
  ] = useAuthHook(!!token);

  const contextValue = useMemo(
    () => ({
      authenticated,
      setAuthorization,
      removeAuthorization,
      checkPermission,
    }),
    [authenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
