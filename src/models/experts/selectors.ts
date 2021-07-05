/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IExpertsState } from './types';
import { IExpert, LoadingStatusEnum } from '../../old/lib/types';
import { store } from '../store';

export const selectExperts = (state: RootStateType): IExpertsState =>
  state.experts;

export const selectExpertsLoading = (state: RootStateType): LoadingStatusEnum =>
  state.experts.loading;

export const selectExpertById = (state: RootStateType, id: number): IExpert => {
  return store.getState().experts.data.experts[id];
};
