import { IPost, IExpert } from '../../../lib/types';
import { MainActions, LoadData, INewestPostPayload } from './actionTypes';

export interface IMainState {
  newest: INewestPostPayload;
  important: IPost[];
  experts: IExpert[];
}

const initialState: IMainState = {
  newest: {
    newestPosts: [],
    meta: {
      currentIndex: 0,
    },
  },
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
        newest: {
          newestPosts: [...action.payload.newestPosts],
          meta: action.payload.meta,
        },
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
