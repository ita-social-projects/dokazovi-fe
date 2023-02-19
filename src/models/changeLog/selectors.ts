import { RootStateType } from 'models/rootReducer';

export const selectSize = (state: RootStateType): number | undefined => {
  return state.changesLog.size;
};
