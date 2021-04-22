import { RootStateType } from '../rootReducer';
import { IUserState } from './types';

export const selectCurrentUser = (state: RootStateType): IUserState =>
  state.currentUser;
