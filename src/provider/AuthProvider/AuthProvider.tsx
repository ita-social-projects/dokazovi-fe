import React, { useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthHook } from '../../lib/hooks/useAuthHook';
import { getToken } from '../../lib/utilities/getToken';

export const AuthProvider: React.FC = ({ children }) => {
  const token = getToken();
  const [authenticated, setAuthorization, removeAuthorization] = useAuthHook(
    !!token,
  );

  const contextValue = useMemo(
    () => ({
      authenticated,
      setAuthorization,
      removeAuthorization,
    }),
    [authenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
