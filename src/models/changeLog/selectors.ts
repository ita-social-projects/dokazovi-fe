import { RootStateType } from 'models/rootReducer';

export const selectSize = (state: RootStateType) => {
  return state.changesLog.size;
};
