/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../rootReducer';
import { IExpertsData, IExpertMeta } from './types';
import { IExpert, LoadingStatusEnum } from '../../old/lib/types';
import { store } from '../store';

export const selectExpertsData = (state: RootStateType): IExpertsData =>
  state.experts.data;

export const selectExpertsMeta = (state: RootStateType): IExpertMeta =>
  state.experts.meta;

export const selectExpertsLoading = (state: RootStateType): LoadingStatusEnum =>
  state.experts.loading;

export const selectExpertsByIds = (ids: number[]): IExpert[] =>
  ids.map((id) => store.getState().experts.data.experts[id]);
