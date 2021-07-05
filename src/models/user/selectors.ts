import { IUserState } from './types';
import { RootStateType } from '../rootReducer';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectCurrentUser = (state: RootStateType): IUserState =>
  state.currentUser;

export const selectCurrentUserError = (state: RootStateType): string | null =>
  state.currentUser.error;

export const selectCurrentUserLoading = (
  state: RootStateType,
): LoadingStatusEnum => state.currentUser.loading;
