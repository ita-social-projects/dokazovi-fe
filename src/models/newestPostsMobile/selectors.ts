import { RootStateType } from '../rootReducer';
import { NewestPostResponseType } from '../../old/lib/utilities/API/types';

export const selectMobileMaterials = (
  state: RootStateType,
): NewestPostResponseType[] => state.mobileMaterials.data;
