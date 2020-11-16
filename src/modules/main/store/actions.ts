import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IRootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store/store';
import { IPost } from '../../../lib/types';
import { MOCK_DATA } from '../../../lib/constants/mock-data';

import {
  LoadData,
  MainActions,
  IExpertsItem,
  INewestItem,
  IImportantAction,
} from './actionTypes';

export function loadImportant(): ThunkAction<
  void, // return type
  IRootState,
  null, // extra arguments passed to the ThunkAction
  Action<IImportantAction>
> {
  return (dispatch: AppDispatch) => Promise.resolve(Array(8).fill(MOCK_DATA))
    .then((payload: IPost[]) => {
      dispatch({
        type: LoadData.LOAD_IMPORTANT,
        payload,
      });
    })
    .catch(console.log);
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
