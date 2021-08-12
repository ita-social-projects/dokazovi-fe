/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
// eslint-disable-next-line import/named
import { IAuthority } from './types';

export const selectAuthorities = (state: RootStateType): IAuthority =>
  state.authorities;
