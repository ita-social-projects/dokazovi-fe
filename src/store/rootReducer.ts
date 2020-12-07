import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import mainReducer from '../modules/main/store/mainSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
