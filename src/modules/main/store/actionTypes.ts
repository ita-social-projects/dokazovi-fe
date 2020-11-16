import { IPost } from '../../../lib/types';

export enum LoadData {
  LOAD_NEWEST = 'LOAD_NEWEST',
  LOAD_IMPORTANT = 'LOAD_IMPORTANT',
  LOAD_EXPERTS = 'LOAD_EXPERTS',
}

export interface IExpertsItem {}

export interface INewestAction {
  type: LoadData.LOAD_NEWEST;
  value: IPost[];
}

export interface IImportantAction {
  type: LoadData.LOAD_IMPORTANT;
  payload: IPost[];
}

export interface IExpertsAction {
  type: LoadData.LOAD_EXPERTS;
  value: IExpertsItem[];
}

export type MainActions = INewestAction | IImportantAction | IExpertsAction;
