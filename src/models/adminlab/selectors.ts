import { RootStateType } from '../rootReducer';
import { IAdminLabData, IAdminLabMeta } from './types';

export const selectAdminLab = (state: RootStateType): IAdminLabData => {
  return state.adminLab.data;
};

export const selectMeta = (state: RootStateType): IAdminLabMeta => {
  return state.adminLab.meta;
};
