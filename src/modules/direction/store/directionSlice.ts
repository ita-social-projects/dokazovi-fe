/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { IExpert } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';
import { getExperts } from '../../../lib/utilities/API/api';

export interface IDirectionsState extends Record<string, IDirectionState> {
  [key: string]: IDirectionState;
}

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
        experts: IExpert[];
        directionName: string;
      }>,
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

export const fetchExperts = (
  directionName: string,
  directionId: number,
): AppThunkType => async (dispatch) => {
  try {
    const loadedExperts = await getExperts({
      params: {
        directions: [directionId],
        size: 11,
      },
    });

    const experts = loadedExperts.data.content.map((expert) => {
      return { ...(expert as IExpert) };
    });

    dispatch(
      loadExperts({
        directionName,
        experts,
      }),
    );
  } catch (e) {
    console.log(e);
  }
};
