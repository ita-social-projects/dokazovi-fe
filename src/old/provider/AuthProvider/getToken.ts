import { LocalStorageKeys } from '../../lib/types';

export function getToken(): string | null {
  return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
}
