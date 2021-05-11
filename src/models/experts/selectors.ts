/* eslint-disable @typescript-eslint/no-unsafe-return */
import { RootStateType } from '../../old/store/rootReducer';
import { IExpertsState } from './types';

export const selectExperts = (state: RootStateType): IExpertsState =>
  state.experts;
