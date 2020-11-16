/* eslint-disable @typescript-eslint/naming-convention */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [thunk];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares)),
);

export type AppDispatch = typeof store.dispatch;
