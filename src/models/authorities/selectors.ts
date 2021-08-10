import { RootStateType } from '../rootReducer';
import { Authority } from './types';

export const selectAuthorities = (state :RootStateType):Authority =>
  state.authorities
