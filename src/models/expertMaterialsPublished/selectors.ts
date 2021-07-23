/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IMaterialsDataPublished } from '../materials/types';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectExpertsDataPublished = (
  state: RootStateType,
): IMaterialsDataPublished => state.expertMaterialsPublished.data;

export const selectExpertMaterialsLoadingPublished = (
  state: RootStateType,
): LoadingStatusEnum => state.expertMaterialsPublished.loading;

export const selectExpertMaterialsErrorPublished = (
  state: RootStateType,
): null | string => state.expertMaterialsPublished.error;
