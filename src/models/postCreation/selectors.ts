/* eslint-disable */
import { RootStateType } from '../../old/store/rootReducer';
import { PostTypeEnum } from '../../old/lib/types';
import {
  INewArticlePostDraft,
  INewDopysPostDraft,
  INewVideoPostDraft,
} from './types';

export const selectVideoUrl = (state: RootStateType): string =>
  state.newPostDraft[PostTypeEnum.VIDEO].videoUrl;

export const selectVideoPostDraft = (
  state: RootStateType,
): INewVideoPostDraft => state.newPostDraft[PostTypeEnum.VIDEO];

export const selectTextPostDraft = (
  state: RootStateType,
  type,
): INewArticlePostDraft | INewDopysPostDraft => state.newPostDraft[type];
