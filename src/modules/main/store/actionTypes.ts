import { IPost, IExpert } from '../../../lib/types';

export enum LoadData {
  LOAD_NEWEST = 'LOAD_NEWEST',
  LOAD_IMPORTANT = 'LOAD_IMPORTANT',
  LOAD_EXPERTS = 'LOAD_EXPERTS',
}

export interface IExpertsItem {}

export interface IMeta {
  totalNewestPosts?: number;
  limit?: number;
  currentIndex: number;
  showMore: boolean;
}

export interface INewestPosts {
  posts: IPost[];
  meta: IMeta;
}

export interface INewestAction {
  type: LoadData.LOAD_NEWEST;
  payload: INewestPosts;
}

export interface IImportantAction {
  type: LoadData.LOAD_IMPORTANT;
  payload: IPost[];
}

export interface IExpertsAction {
  type: LoadData.LOAD_EXPERTS;
  value: IExpert[];
}

export type MainActions = INewestAction | IImportantAction | IExpertsAction;
