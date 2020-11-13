import { combineReducers } from 'redux';

import { directionReducer } from '../modules/direction/store/directionReducer';
import { IMainState, mainReducer } from '../modules/main/store/mainReducer';

export interface IRootState {
  main: IMainState
}

export default combineReducers({
  main: mainReducer,
  direction: directionReducer,
});
