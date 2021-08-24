/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectExpertsData = (state: RootStateType) =>
  state.expertMaterials.data;

export const selectExpertMaterialsLoading = (
  state: RootStateType,
): LoadingStatusEnum => state.expertMaterials.loading;

export const selectExpertMaterialsError = (
  state: RootStateType,
): null | string => state.expertMaterials.error;
