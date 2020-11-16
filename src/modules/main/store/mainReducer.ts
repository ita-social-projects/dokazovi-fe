import { IPost } from '../../../lib/types';
import {
  MainActions,
  IExpertsItem,
  LoadData,
  INewestPosts,
} from './actionTypes';

export interface IMainState {
  newest: INewestPosts;
  important: IPost[];
  experts: IExpertsItem[];
}

const initialState: IMainState = {
  newest: {
    posts: [],
    meta: {
      limit: 0,
      totalNewestPosts: 50,
      currentIndex: 0,
      showMore: true,
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
          posts: [...state.newest.posts, ...action.payload.posts],
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
        experts: [...state.experts, action.value],
      };
    default:
      return state;
  }
}
