import { combineReducers } from 'redux';
import { expertsReducer } from '../modules/experts/store/expertsSlice';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import propertiesReducer from './propertiesSlice';
import dataReducer from './dataSlice';
import { signInReducer } from './user';
import { materialsReducer } from '../modules/materials/store/materialsSlice';

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
