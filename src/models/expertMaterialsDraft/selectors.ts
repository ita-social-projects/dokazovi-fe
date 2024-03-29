/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IMaterialsDataByStatus } from '../expertMaterialsPublished/types';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectExpertsDataDraft = (
  state: RootStateType,
): IMaterialsDataByStatus => state.expertMaterialsDraft.data;

export const selectExpertMaterialsLoadingDraft = (
  state: RootStateType,
): LoadingStatusEnum => state.expertMaterialsDraft.loading;

export const selectExpertMaterialsErrorDraft = (
  state: RootStateType,
): null | string => state.expertMaterialsDraft.error;
