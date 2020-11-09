import {
  LoadData,
  MainActions,
  IExpertsItem,
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

export function loadExperts(payload: IExpertsItem[]): MainActions {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
