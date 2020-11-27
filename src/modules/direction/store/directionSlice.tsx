/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_COURSES } from '../courses/directionCourses.mock';
import { ICourse } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';

export interface IDirectionState {
  courses: ICourse[];
}

const initialState: IDirectionState = {
  courses: [],
};

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    loadCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { loadCourses } = directionSlice.actions;

export default directionSlice.reducer;

export const fetchCourses = (): AppThunkType => async (dispatch) => {
  try {
    const courses = await Promise.resolve(MOCK_COURSES);
    dispatch(loadCourses(courses));
  } catch (e) {
    console.log(e);
  }
};
