import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import mainReducer from '../modules/main/store/mainSlice';
import propertiesReducer from './properties';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
  properties: propertiesReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
