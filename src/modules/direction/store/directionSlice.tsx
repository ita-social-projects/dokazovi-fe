/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_COURSES } from '../courses/directionCourses.mock';
import { ICourse, IExpert, IPost } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';

// tmp type
interface IMeta {
  totalPosts?: number;
  limit?: number;
  currentIndex: number;
  showMore?: boolean;
}
export interface IMaterialsPayload {
  posts: IPost[];
  meta: IMeta;
}

export interface IDirectionState {
  experts: IExpert[];
  materials: IMaterialsPayload;
  courses: ICourse[];
}

const initialState: IDirectionState = {
  experts: [],
  materials: {
    posts: [],
    meta: {
      currentIndex: 0,
    },
  },
  courses: [],
};

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpert[]>) => {
      state.experts = action.payload;
    },
    loadMaterials: (state, action: PayloadAction<IMaterialsPayload>) => {
      state.materials = action.payload;
    },
    loadCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
  },
});

export const {
  loadExperts,
  loadMaterials,
  loadCourses,
} = directionSlice.actions;

export default directionSlice.reducer;

export const fetchCourses = (): AppThunkType => async (dispatch) => {
  try {
    const courses = await Promise.resolve(MOCK_COURSES);
    dispatch(loadCourses(courses));
  } catch (e) {
    console.log(e);
  }
};
