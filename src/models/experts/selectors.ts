/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IExpertsState } from './types';
import { IMaterialsData } from '../materials/types';
import { LoadingStatusEnum, IExpert } from '../../old/lib/types';
import { store } from '../store';

export const selectExperts = (state: RootStateType): IExpertsState =>
  state.experts;

export const selectExpertsData = (state: RootStateType): IMaterialsData =>
  state.experts.posts.data;

export const selectLoadingExpertsPosts = (
  state: RootStateType,
): LoadingStatusEnum => state.experts.loading;

export const selectLoadingExperts = (state: RootStateType): LoadingStatusEnum =>
  state.experts.loading;

export const selectExpertById = (state: RootStateType, id: number): IExpert => {
  return store.getState().experts.data.experts[id];
};
