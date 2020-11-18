/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MOCK_DATA } from '../../../lib/constants/mock-data';
import { IPost, IExpert } from '../../../lib/types';
import { INewestItem } from './actionTypes';

export interface IMainState {
  newest: INewestItem[];
  important: IPost[];
  experts: IExpert[];
}

const initialState: IMainState = {
  newest: [],
  important: [],
  experts: [],
};

export const mainSlice = createSlice({
  // a string that is used as the prefix for generated action types
  // e.g. "main/loadImportant"
  name: 'main',
  initialState,
  // An object of "case reducers" (functions intended to handle a specific
  // action type). Key names will be used to generate actions, equivalent to a
  // single case statement in a switch.
  reducers: {
    loadImportant: (state) => {
      const payload: IPost[] = [MOCK_DATA]; // Array(8).fill(MOCK_DATA);
      state.important = payload;
    },
  }
});

export const { loadImportant, } = mainSlice.actions;

export default mainSlice.reducer;
