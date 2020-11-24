import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';
import type { RootStateType } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppThunkType = ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<string>
>;

export type AppDispatchType = typeof store.dispatch;
