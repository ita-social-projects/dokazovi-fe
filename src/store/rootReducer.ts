import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import mainReducer from '../modules/main/store/mainSlice';
import typesReducer from './filterDataSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
  types: typesReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
