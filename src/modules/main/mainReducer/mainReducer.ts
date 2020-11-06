import { MainActions, MainState, LoadData } from './actionTypes';

const initialState: MainState = {
  newest: [],
  important: [],
  experts: [],
};

export default function mainReducer(
  state = initialState,
  action: MainActions,
): MainState {
  switch (action.type) {
    case LoadData.LOAD_NEWEST:
      return {
        ...state,
        newest: [...state.newest, action.value],
      };
    case LoadData.LOAD_IMPORTANT:
      return {
        ...state,
        important: [...state.important, action.value],
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
