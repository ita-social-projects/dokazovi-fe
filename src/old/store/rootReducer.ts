import { combineReducers } from 'redux';
import { expertsReducer } from './experts/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import propertiesReducer from './propertiesSlice';
import dataReducer from './dataSlice';
import { signInReducer } from './user';
import { materialsReducer } from './materials/materialsSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  materials: materialsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  newPostDraft: postCreationReducer,
  data: dataReducer,
  currentUser: signInReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
