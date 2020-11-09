import {
  LoadData,
  DirectionActions,
  IMaterialsItem,
  IExpertsItem,
} from './actionTypes';

export function loadMaterials(payload: IMaterialsItem[]): DirectionActions {
  return {
    type: LoadData.LOAD_MATERIALS,
    value: payload,
  };
}

export function loadExperts(payload: IExpertsItem[]): DirectionActions {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
