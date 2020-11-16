import { IPost, IExpert } from '../../../lib/types';
import {
  MainActions,
  INewestItem,
  LoadData,
} from './actionTypes';

export interface IMainState {
  newest: INewestItem[];
  important: IPost[];
  experts: IExpert[];
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
        newest: action.value,
      };
    case LoadData.LOAD_IMPORTANT:
      return {
        ...state,
        important: action.payload,
      };
    case LoadData.LOAD_EXPERTS:
      return {
        ...state,
        experts: action.value,
      };
    default:
      return state;
  }
}
