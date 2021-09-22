import { RootStateType } from '../rootReducer';

export const selectMobileMaterials = (state: RootStateType) =>
  state.mobileMaterials.data;
