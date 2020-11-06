import { MainActions, MainState, LoadData } from './actionTypes';

const initialState: MainState = {
  materials: [],
  experts: [],
};

export default function mainReducer(
  state = initialState,
  action: MainActions,
): MainState {
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
