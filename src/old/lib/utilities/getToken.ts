import { LocalStorageKeys } from '../types';

export function getToken(): string | null {
  return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
}
