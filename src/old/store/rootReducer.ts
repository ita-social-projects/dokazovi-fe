import { combineReducers } from 'redux';
import { expertsReducer } from '../../models/experts';
import { postCreationReducer } from '../../models/postCreation';
import { propertiesReducer } from '../../models/properties';
import dataReducer from './dataSlice';
import { signInReducer } from '../../models/user';
import { materialsReducer } from '../../models/materials';
import { mainReducer } from '../../models/main';

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
