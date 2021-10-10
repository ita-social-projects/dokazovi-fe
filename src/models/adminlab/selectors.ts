import { RootStateType } from '../rootReducer';
import { IAdminlabData, IAdminLabMeta } from './types';

export const selectAdminlab = (state: RootStateType): IAdminlabData => {
  return state.adminlab.data;
};

export const selectMeta = (state: RootStateType): IAdminLabMeta => {
  return state.adminlab.meta;
};
