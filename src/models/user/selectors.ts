import { IUserState } from './types';
import { RootStateType } from '../../old/store/rootReducer';

export const selectCurrentUser = (state: RootStateType): IUserState =>
  state.currentUser;
