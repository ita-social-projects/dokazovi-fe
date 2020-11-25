import { combineReducers } from 'redux';
import mainReducer from '../modules/main/store/mainSlice';

const rootReducer = combineReducers({
  main: mainReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
