import { RootStateType } from '../rootReducer';
import { IAdminlabData } from './types';

export const selectAdminlab = (state: RootStateType): IAdminlabData => {
  return state.adminlab.data;
};
