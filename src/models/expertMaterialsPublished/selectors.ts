/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IMaterialsDataByStatus } from '../materials/types';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectExpertsDataPublished = (
  state: RootStateType,
): IMaterialsDataByStatus => state.expertMaterialsPublished.data;

export const selectExpertMaterialsLoadingPublished = (
  state: RootStateType,
): LoadingStatusEnum => state.expertMaterialsPublished.loading;

export const selectExpertMaterialsErrorPublished = (
  state: RootStateType,
): null | string => state.expertMaterialsPublished.error;

export const selectExpertsStatusPublished = (
  state: RootStateType,
): undefined | string => state.expertMaterialsPublished.data.status;
