import { combineReducers } from 'redux';
import { expertsReducer } from './experts';
import { postCreationReducer } from './postCreation';
import { propertiesReducer } from './properties';
import { signInReducer } from './user';
import { materialsReducer } from './materials';
import { mainReducer } from './main';
import { expertMaterialsReducer } from './expertMaterials';
import { expertMaterialsReducerDraft } from './expertMaterialsDraft';
import { expertMaterialsReducerPublished } from './expertMaterialsPublished';
import { infoReducer } from './info';

const rootReducer = combineReducers({
  main: mainReducer,
  materials: materialsReducer,
  properties: propertiesReducer,
  experts: expertsReducer,
  expertMaterials: expertMaterialsReducer,
  expertMaterialsDraft: expertMaterialsReducerDraft,
  expertMaterialsPublished: expertMaterialsReducerPublished,
  newPostDraft: postCreationReducer,
  currentUser: signInReducer,
  info: infoReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
