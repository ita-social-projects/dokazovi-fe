import { IUserState } from './types';
import { RootStateType } from '../rootReducer';

export const selectCurrentUser = (state: RootStateType): IUserState =>
  state.currentUser;

export const selectCurrentUserError = (state: RootStateType): string | null =>
  state.currentUser.error;
