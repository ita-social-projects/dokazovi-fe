/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MOCK_EXPERTS from '../../main/mockDataExperts';
import { IExpert } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';

export interface IDirectionState {
  experts: IExpert[];
}

const initialState: IDirectionState = {
  experts: [],
};

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpert[]>) => {
      state.experts = action.payload;
    },
  },
});

export const { loadExperts } = directionSlice.actions;

export default directionSlice.reducer;

export const fetchExperts = (): AppThunkType => async (dispatch) => {
  try {
    const experts = await Promise.resolve(MOCK_EXPERTS);
    dispatch(loadExperts(experts));
  } catch (e) {
    console.log(e);
  }
};
