import { combineReducers } from 'redux';

import { IExpert } from '../lib/types';

import { directionReducer } from '../modules/direction/store/directionReducer';
import { mainReducer } from '../modules/main/store/mainReducer';

export interface IRootState {
  main: {
    important: any;
    newest: any;
    experts: IExpert[];
  };
}

export default combineReducers({
  main: mainReducer,
  direction: directionReducer,
});
