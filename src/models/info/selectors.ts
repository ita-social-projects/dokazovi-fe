import { RootStateType } from '../rootReducer';
import { LoadingStatusEnum } from '../../old/lib/types';
import { PlatformInformationType } from '../../old/lib/utilities/API/types';

export const selectInfoById = (type: number) => (
  state: RootStateType,
): PlatformInformationType => {
  return state.info[type].data as PlatformInformationType;
};

export const selectInfoLoadingById = (type: number) => (
  state: RootStateType,
): LoadingStatusEnum => {
  return state.info[type].loading;
};

export const selectInfoErrorById = (type: number) => (
  state: RootStateType,
): string | null => {
  return state.info[type].error;
};
