import { combineReducers } from 'redux';
import mainReducer from '../modules/main/store/mainSlice';
import directionReducer from '../modules/direction/store/directionSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  direction: directionReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
