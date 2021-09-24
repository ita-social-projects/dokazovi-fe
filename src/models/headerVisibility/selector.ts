import { RootStateType } from '../rootReducer';
import { IVisibilityState } from './types';

export const selectHeaderVisibility = (
  state: RootStateType,
): IVisibilityState => state.headerVisibility;
