import { combineReducers } from 'redux';

import { directionReducer, IDirectionState } from '../modules/direction/store/directionReducer';
import { mainReducer, IMainState } from '../modules/main/store/mainReducer';

export interface IRootState {
  main: IMainState;
  direction: IDirectionState;
}

export default combineReducers({
  main: mainReducer,
  direction: directionReducer,
});
