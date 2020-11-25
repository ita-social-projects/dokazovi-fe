import {
  LoadData,
  DirectionActionsType,
  IMaterialsItem,
  IExpertsItem,
} from './actionTypes';

export function loadMaterials(payload: IMaterialsItem[]): DirectionActionsType {
  return {
    type: LoadData.LOAD_MATERIALS,
    value: payload,
  };
}

export function loadExperts(payload: IExpertsItem[]): DirectionActionsType {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
