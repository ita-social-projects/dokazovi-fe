/* eslint-disable import/named */
import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import { expertsReducer } from '../modules/experts/store/expertsSlice';
import { postsReducer } from '../modules/posts/store/postsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import propertiesReducer from './propertiesSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  posts: postsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
