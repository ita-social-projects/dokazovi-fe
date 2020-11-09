import { combineReducers } from 'redux';

import { directionReducer } from '../modules/direction/directionReducer/directionReducer';
import { mainReducer } from '../modules/main/mainReducer/mainReducer';

export default combineReducers({
  main: mainReducer,
  direction: directionReducer,
});
