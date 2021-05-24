import { RootStateType } from '../../old/store/rootReducer';
import { IMaterialsState } from './types';

export const selectMaterials = (state: RootStateType): IMaterialsState =>
  state.materials;
