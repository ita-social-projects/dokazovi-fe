import { RootStateType } from '../rootReducer';
import { IAuthority } from './types';

export const selectAuthorities = (state: RootStateType): IAuthority =>
  state.authorities;
