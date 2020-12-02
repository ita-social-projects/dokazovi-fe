/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MOCK_EXPERTS from '../../main/mockDataExperts';
import { IDirection, IExpert } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';
import { getExperts } from '../../../lib/utilities/API/api';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import { postTypeProperties } from '../../../lib/constants/post-type-properties';

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
    // const experts = await Promise.resolve(MOCK_EXPERTS);
    const bExperts = await getExperts({
      params: {
        directions: [directionId],
      },
    });
    console.log(bExperts);
    const experts = bExperts.data.content.map((expert) => {
      return {
        id: expert.id,
        avatar: expert.avatar,
        firstName: expert.firstName,
        lastName: expert.lastName,
        mainDirection: expert.mainDirection as IDirection,
        mainInstitution: expert.mainInstitution,
        qualification: expert.qualification,
        lastAddedPost: expert.lastAddedPost,
      };
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
