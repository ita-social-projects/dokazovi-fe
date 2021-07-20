import { RootStateType } from '../rootReducer';
import { LoadingStatusEnum } from '../../old/lib/types';
import {
  IImportantPostsPayload,
  IMainState,
  INewestPostsPayload,
} from './types';

export const selectNewestPosts = (state: RootStateType): INewestPostsPayload =>
  state.main.newest;

export const selectImportantPosts = (
  state: RootStateType,
): IImportantPostsPayload => state.main.important;

export const selectMain = (state: RootStateType): IMainState => state.main;

export const selectLoadingMain = (state: RootStateType): LoadingStatusEnum =>
  state.main.loading;

export const selectSetImportantSuccess = (
  state: RootStateType,
): boolean | undefined => state.main.setImportant.success;
