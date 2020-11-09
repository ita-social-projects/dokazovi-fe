import {
  DirectionActions,
  IMaterialsItem,
  IExpertsItem,
  LoadData,
} from './actionTypes';

export interface IDirectionState {
  materials: IMaterialsItem[];
  experts: IExpertsItem[];
}

const initialState: IDirectionState = {
  materials: [],
  experts: [],
};

export function directionReducer(
  state = initialState,
  action: DirectionActions,
): IDirectionState {
  switch (action.type) {
    case LoadData.LOAD_MATERIALS:
      return {
        ...state,
        materials: [...state.materials, action.value],
      };
    case LoadData.LOAD_EXPERTS:
      return {
        ...state,
        experts: [...state.experts, action.value],
      };
    default:
      return state;
  }
}
