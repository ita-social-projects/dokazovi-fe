import { combineReducers } from 'redux';
import { directionsReducer } from '../modules/direction/store/directionSlice';
import { expertsReducer } from '../modules/experts/store/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import propertiesReducer from './propertiesSlice';
import dataReducer from './dataSlice';
import authReducer from './authSlice';
import { materialsReducer } from '../modules/materials/store/materialsSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  materials: materialsReducer,
  directions: directionsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  newPostDraft: postCreationReducer,
  data: dataReducer,
  currentUser: authReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
