/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MOCK_EXPERTS from '../../main/mockDataExperts';
import { IExpert } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';

export type IDirectionsState = Record<string, IDirectionState>
export interface IDirectionState {
  experts: IExpert[];
}

const initialDirectionState: IDirectionState = {
  experts: [],
};

export const directionsSlice = createSlice({
  name: 'direction',
  initialState: {} as IDirectionsState,
  reducers: {
    setupDirection: (state, action: PayloadAction<string>) => {
      state[action.payload] = initialDirectionState;
    },
    loadExperts: (
      state,
      action: PayloadAction<{
        experts: IExpert[],
        directionName: string,
      }>
    ) => {
      const { directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.experts = action.payload.experts;
      }
    },
  },
});

export const { loadExperts, setupDirection } = directionsSlice.actions;

export const directionsReducer = directionsSlice.reducer;

export const fetchExperts = (directionName: string): AppThunkType => async (dispatch) => {
  try {
    const experts = await Promise.resolve(MOCK_EXPERTS);
    dispatch(loadExperts({
      directionName,
      experts,
    }));
  } catch (e) {
    console.log(e);
  }
};
