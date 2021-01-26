import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import { expertsReducer } from '../modules/experts/store/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import propertiesReducer from './propertiesSlice';
import dataReducer from './dataSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  directions: directionsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  newPostDraft: postCreationReducer,
  data: dataReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
