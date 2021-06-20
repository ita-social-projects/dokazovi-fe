import { combineReducers } from 'redux';
import { expertsReducer } from './experts';
import { postCreationReducer } from './postCreation';
import { propertiesReducer } from './properties';
import { signInReducer } from './user';
import { materialsReducer } from './materials';
import { mainReducer } from './main';
import { expertMaterialsReducer } from './expertMaterials';

const rootReducer = combineReducers({
  main: mainReducer,
  materials: materialsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  expertMaterials: expertMaterialsReducer,
  newPostDraft: postCreationReducer,
  currentUser: signInReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
