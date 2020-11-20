import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { MOCK_DATA } from '../../../lib/constants/mock-data';
import { IPost } from '../../../lib/types';
import { IRootState } from '../../../store/rootReducer';
import { AppDispatch, store } from '../../../store/store';
import { NEWEST_POSTS_DATA_MOCK } from '../components/constants/newestPosts-mock';
import { LOAD_POSTS_LIMIT } from '../components/constants/newestPostsPagination-config';
import MOCK_CARDS from '../mockDataExperts';
import {
  IImportantAction,
  INewestAction,
  INewestPostPayload, LoadData,
  MainActions
} from './actionTypes';

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

  const isTotalNewPosts = () =>
    meta.totalNewestPosts
      ? meta.totalNewestPosts
      : NEWEST_POSTS_DATA_MOCK.length;

  const newIndex = meta.currentIndex + LOAD_POSTS_LIMIT;
  const newShowMore = newIndex < isTotalNewPosts() - 1;
  const newList = Array.from(NEWEST_POSTS_DATA_MOCK).slice(0, newIndex);

  return (dispatch: AppDispatch) =>
    dispatch(
      loadNewest({
        newestPosts: newList,
        meta: {
          totalNewestPosts: isTotalNewPosts(),
          currentIndex: newIndex,
          showMore: newShowMore,
        },
      }),
    );
}

export function loadNewest(payload: INewestPostPayload): MainActions {
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
