import {
  LoadData,
  MainActions,
  IMaterialsItem,
  IExpertsItem,
} from './actionTypes';

export function loadMaterials(payload: IMaterialsItem[]): MainActions {
  return {
    type: LoadData.LOAD_MATERIALS,
    value: payload,
  };
}

export function loadExperts(payload: IExpertsItem[]): MainActions {
  return {
    type: LoadData.LOAD_EXPERTS,
    value: payload,
  };
}
