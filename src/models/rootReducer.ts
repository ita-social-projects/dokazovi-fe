import { combineReducers } from 'redux';
import { expertsReducer } from './experts';
import { postCreationReducer } from './postCreation';
import { propertiesReducer } from './properties';
import dataReducer from './dataSlice';
import { signInReducer } from './user';
import { materialsReducer } from './materials';
import { mainReducer } from './main';

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
