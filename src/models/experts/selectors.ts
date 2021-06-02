/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../../old/store/rootReducer';
import { IExpertsState } from './types';
import { IMaterialsData } from '../materials/types';
import { LoadingStatusEnum } from '../../old/lib/types';

export const selectExperts = (state: RootStateType): IExpertsState =>
  state.experts;

export const selectExpertsData = (state: RootStateType): IMaterialsData =>
  state.experts.posts.data;

export const selectLoadingExpertsPosts = (
  state: RootStateType,
): LoadingStatusEnum => state.experts.posts.loading;

export const selectLoadingExperts = (state: RootStateType): LoadingStatusEnum =>
  state.experts.loading;

export const selectErrorExperts = (state: RootStateType): null | string =>
  state.experts.error;
