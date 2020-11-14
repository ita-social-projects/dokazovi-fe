import {
  MainActions,
  IImportantItem,
  IExpertsItem,
  LoadData,
} from './actionTypes';
import { IPost } from '../../../lib/types';

export interface IMainState {
  newest: IPost[];
  important: IImportantItem[];
  experts: IExpertsItem[];
}

const initialState: IMainState = {
  newest: [],
  important: [],
  experts: [],
};

export function mainReducer(
  state = initialState,
  action: MainActions,
): IMainState {
  switch (action.type) {
    case LoadData.LOAD_NEWEST:
      return {
        ...state,
        newest: [...state.newest, ...action.value],
      };
    case LoadData.LOAD_IMPORTANT:
      return {
        ...state,
        important: [...state.important, action.value],
      };
    case LoadData.LOAD_EXPERTS:
      return {
        ...state,
        experts: [...state.experts, action.value],
      };
    default:
      return state;
  }
}
