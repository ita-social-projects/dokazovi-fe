import { IExpert } from '../../../lib/types';

import {
  LoadData,
  MainActions,
  IImportantItem,
  INewestItem,
} from './actionTypes';

export function loadImportant(payload: IImportantItem[]): MainActions {
  return {
    type: LoadData.LOAD_IMPORTANT,
    value: payload,
  };
}

export function loadNewest(payload: INewestItem[]): MainActions {
  return {
    type: LoadData.LOAD_NEWEST,
    value: payload,
  };
}

export function loadExperts(payload: IExpert[]): MainActions {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
