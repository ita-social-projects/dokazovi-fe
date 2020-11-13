import { IPost } from '../../../lib/types';
import {
  LoadData,
  MainActions,
  IExpertsItem,
  INewestItem,
} from './actionTypes';

export function loadImportant(payload: IPost[]): MainActions {
  return {
    type: LoadData.LOAD_IMPORTANT,
    payload,
  };
}

export function loadNewest(payload: INewestItem[]): MainActions {
  return {
    type: LoadData.LOAD_NEWEST,
    value: payload,
  };
}

export function loadExperts(payload: IExpertsItem[]): MainActions {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
