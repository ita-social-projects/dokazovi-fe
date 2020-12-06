/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MOCK_EXPERTS from '../../main/mockDataExperts';
import { MOCK_COURSES } from '../courses/directionCourses.mock';
import { IExpert, ICourse } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';

export interface IDirectionsState extends Record<string, IDirectionState> {
  [key: string]: IDirectionState
}

export interface IDirectionState {
  experts?: IExpert[];
  courses?: ICourse[];
}

const initialDirectionState: IDirectionState = {
  experts: [],
  courses: [],
};

export const directionsSlice = createSlice({
  name: 'direction',
  initialState: {} as IDirectionsState,
  reducers: {
    setupDirection: (state, action: PayloadAction<string>) => {
      if (!state[action.payload]) {
        state[action.payload] = initialDirectionState;
      }
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
    loadCourses: (
      state,
      action: PayloadAction<{
        courses: ICourse[],
        directionName: string
      }>
    ) => {
      const { directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.courses = action.payload.courses;
      }
    },
  },
});

export const { loadExperts, loadCourses, setupDirection } = directionsSlice.actions;

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

export const fetchCourses = (directionName: string): AppThunkType => async (dispatch) => {
  try {
    const courses = await Promise.resolve(MOCK_COURSES);
    dispatch(loadCourses({
      directionName,
      courses, 
    }));
  } catch (e) {
    console.log(e);
  }
};

