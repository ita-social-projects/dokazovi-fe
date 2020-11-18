import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../modules/main/store/mainSlice';

export const store = configureStore({
  /* to create a root reducer combineReducers() is called behind the scenes */
  reducer: {
    main: mainReducer,
    // direction: directionReducer,
  },
  /* these are passed to applyMiddleware()
   * if not provided, getDefaultMiddleware is called, the defaults are
   * [thunk, immutableStateInvariant, serializableStateInvariant] */
  // middleware: [thunk],
  /* Redux DevTools Extension is enabled by default */
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
