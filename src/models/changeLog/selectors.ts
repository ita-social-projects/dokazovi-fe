import { RootStateType } from 'models/rootReducer';
import { IChangeLog } from './types';

export const selectSize = (state: RootStateType) => {
  return state.changesLog;
};
