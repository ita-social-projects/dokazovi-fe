import { combineReducers } from 'redux';
import { expertsReducer } from './experts/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import propertiesReducer from './propertiesSlice';
import dataReducer from './dataSlice';
import authReducer from './authSlice';
import { materialsReducer } from './materials';

const rootReducer = combineReducers({
  main: mainReducer,
  materials: materialsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  newPostDraft: postCreationReducer,
  data: dataReducer,
  currentUser: authReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
