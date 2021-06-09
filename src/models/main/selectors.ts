import { RootStateType } from '../rootReducer';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IImportantPostsPayload, INewestPostsPayload } from './types';

export const selectNewestPosts = (state: RootStateType): INewestPostsPayload =>
  state.main.newest;

export const selectImportantPosts = (
  state: RootStateType,
): IImportantPostsPayload => state.main.important;

export const selectLoadingMain = (state: RootStateType): LoadingStatusEnum =>
  state.main.loading;
