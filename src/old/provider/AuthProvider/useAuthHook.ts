import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { LocalStorageKeys } from '../../lib/types';

export const useAuthHook = (
  defaultValue: boolean,
): [
  boolean,
  (token: string) => void,
  () => void,
  (permission: string) => boolean,
] => {
  const [state, setState] = useState<boolean>(defaultValue);

  const setToken = (token: string) => {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
    const decoded: { Permissions: string } = jwt_decode(token);
    localStorage.setItem(LocalStorageKeys.PERMISSIONS, decoded.Permissions);
    setState(true);
  };

  const removeToken = () => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.PERMISSIONS);
    setState(false);
  };

  const checkPermission = (permission: string) => {
    const permissionsStr = localStorage.getItem(LocalStorageKeys.PERMISSIONS);
    if (!permissionsStr) {
      return false;
    }
    return permissionsStr.includes(permission);
  };
  return [state, setToken, removeToken, checkPermission];
};
