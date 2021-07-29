import { RootStateType } from '../rootReducer';
import { IMaterialsState } from '../materials/types';

export const selectMaterialsImportant = (
  state: RootStateType,
): IMaterialsState => state.materialsImportant;
