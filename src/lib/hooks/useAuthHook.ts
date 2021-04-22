import { useState } from 'react';
import { LocalStorageKeys } from '../types';

export const useAuthHook = (
  defaultValue: boolean,
): [boolean, (token: string) => void, () => void] => {
  const [state, setState] = useState<boolean>(defaultValue);

  const setToken = (token: string) => {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token);
    setState(true);
  };

  const removeToken = () => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    setState(false);
  };

  return [state, setToken, removeToken];
};
