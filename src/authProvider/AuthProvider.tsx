import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAsyncAction } from '../store/user';
import { LocalStorageKeys } from '../lib/types';
import { AuthContext } from './AuthContex';
import { useAuthHook } from '../lib/hooks/useAuthHook';

function getToken(): string | null {
  return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
}

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(getUserAsyncAction());
    }
  }, []);

  const [authenticated, setToken, removeToken] = useAuthHook(!!token);

  const contextValue = useMemo(
    () => ({
      authenticated,
      setToken,
      removeToken,
    }),
    [authenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
