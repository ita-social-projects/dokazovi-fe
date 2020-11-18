/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import MOCK_POSTS from '../../../lib/constants/mock-data';
import MOCK_EXPERTS from '../mockDataExperts';
import { IPost, IExpert } from '../../../lib/types';

export interface IMainState {
  newest: IPost[];
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
      // const payload: IPost[] = Array(8).fill(MOCK_DATA) wouldn't work here:
      // Unsafe assignment of type any[] to a variable of type IPost[].
      const payload: IPost[] = MOCK_POSTS; 
      state.important = payload;
    },
    loadExperts: (state) => {
      const payload: IExpert[] = MOCK_EXPERTS;
      state.experts = payload;
    },
    loadNewest: (state) => {
      const payload: IPost[] = MOCK_POSTS; // Array(8).fill(MOCK_DATA);
      state.newest = payload;
    },
  },
});

export const { loadImportant, loadExperts, loadNewest } = mainSlice.actions;

export default mainSlice.reducer;
