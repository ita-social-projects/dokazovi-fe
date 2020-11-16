import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IRootState } from '../../../store/rootReducer';
import { AppDispatch, store } from '../../../store/store';
import { IPost } from '../../../lib/types';
import { MOCK_DATA } from '../../../lib/constants/mock-data';
import MOCK_CARDS from '../mockDataExperts';

import {
  LoadData,
  MainActions,
  IExpertsItem,
  IImportantAction,
  INewestAction,
  INewestPosts,
} from './actionTypes';

import {
  NUMBER_OF_POSTS,
  LOAD_POSTS_LIMIT,
} from '../components/constants/newestPostsPagination-config';
import { NEWEST_POSTS_MOCK_DATA } from '../components/constants/newestPostsMock-data';

export function loadImportant(): ThunkAction<
  Promise<unknown>, // return type
  IRootState,
  null, // extra arguments passed to the ThunkAction
  Action<IImportantAction>
> {
  return (dispatch: AppDispatch) =>
    Promise.resolve(Array(8).fill(MOCK_DATA))
      .then((payload: IPost[]) => {
        dispatch({
          type: LoadData.LOAD_IMPORTANT,
          payload,
        });
      })
      .catch(console.log);
}

export function loadNewestThunk(): ThunkAction<
  void,
  IRootState,
  null,
  Action<INewestAction>
> {
  const { meta } = store.getState().main.newest;
  const newIndex = meta.currentIndex + LOAD_POSTS_LIMIT;
  const newShowMore = newIndex < meta.totalNewestPosts! - 1;
  const newList = [
    ...NEWEST_POSTS_MOCK_DATA.slice(meta.currentIndex, newIndex),
  ];

  return (dispatch: AppDispatch) =>
    dispatch(
      loadNewest({
        posts: newList,
        meta: {
          currentIndex: newIndex,
          showMore: newShowMore,
          totalNewestPosts: NUMBER_OF_POSTS,
        },
      }),
    );
}

export function loadNewest(payload: INewestPosts): MainActions {
  return {
    type: LoadData.LOAD_NEWEST,
    payload,
  };
}

export function loadExperts(): MainActions {
  const payload = MOCK_CARDS;

  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
