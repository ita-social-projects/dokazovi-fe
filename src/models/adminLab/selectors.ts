import { RootStateType } from '../rootReducer';
import { IAdminLabData, IAdminLabMeta, IAdminLabModifications } from './types';

export const selectAdminLab = (state: RootStateType): IAdminLabData => {
  return state.adminLab.data;
};

export const selectMeta = (state: RootStateType): IAdminLabMeta => {
  return state.adminLab.meta;
};

export const selectModifications = (state: RootStateType): IAdminLabModifications => {
  return state.adminLab.modifications;
};
