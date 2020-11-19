import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  /* we can also pass and object with reducers, the to create a root reducer
   * combineReducers() will be called behind the scenes */
  // reducer: {
  //   main: mainReducer,
  //   direction: directionReducer,
  // },
  /* these are passed to applyMiddleware()
   * if not provided, getDefaultMiddleware is called, the defaults are
   * [thunk, immutableStateInvariant, serializableStateInvariant] */
  // middleware: [thunk],
  /* Redux DevTools Extension is enabled by default */
  // devTools: true,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch;
