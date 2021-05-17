import { combineReducers } from 'redux';
import { expertsReducer } from '../../models/experts';
import mainReducer from '../modules/main/store/mainSlice';
import postCreationReducer from '../modules/postCreation/store/postCreationSlice';
import { propertiesReducer } from '../../models/properties';
import dataReducer from './dataSlice';
import { signInReducer } from '../../models/user';
import { materialsReducer } from '../../models/materials';

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
