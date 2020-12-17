import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import { expertsReducer } from '../modules/experts/store/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import propertiesReducer from './propertiesSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
