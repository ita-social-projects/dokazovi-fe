import { combineReducers } from 'redux';

import { directionReducer } from '../modules/direction/store/directionReducer';
import { mainReducer } from '../modules/main/store/mainReducer';

export default combineReducers({
  main: mainReducer,
  direction: directionReducer,
});
