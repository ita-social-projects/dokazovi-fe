import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';
import type { RootState } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch;
