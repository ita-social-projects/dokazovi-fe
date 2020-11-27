import { combineReducers } from 'redux';
import { directionReducer } from '../modules/direction/store/directionReducer';
import mainReducer from '../modules/main/store/mainSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  direction: directionReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
