/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_COURSES } from '../courses/directionCourses.mock';
import {
  DirectionEnum,
  ICourse,
  IExpert,
  IPost,
  PostTypeEnum,
} from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';
import { getPosts } from '../../../lib/utilities/API/api';
import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';

export interface IMaterialsPayload {
  posts: IPost[];
  meta: {
    last: boolean;
    isLoading: boolean;
    pageNumber: number;
  };
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
      last: false,
      isLoading: false,
      pageNumber: -1, // pages are zero-indexed?
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
    setMaterialsLoadingStatus: (state) => {
      state.materials.meta.isLoading = true;
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
  setMaterialsLoadingStatus,
  loadMaterials,
  loadCourses,
} = directionSlice.actions;

export default directionSlice.reducer;

export const fetchMaterials = (): AppThunkType => async (
  dispatch,
  getState,
) => {
  const { posts, meta } = getState().direction.materials;
  
  const response = await getPosts('latest-by-direction', {
    params: {
      direction: 1, // get directionID argument from MaterialsContainer
      page: meta.pageNumber + 1,
      size: LOAD_POSTS_LIMIT,
    },
  });

  const fetchedPosts = response.data.content.map((post) => {
    const {
      avatar,
      firstName,
      lastName,
      mainInstitution: workPlace,
    } = post.author;
    const date = Date.parse(post.createdAt.split('.').reverse().join('-'));
    const preview = post.content.length > 40
      ? `${post.content.slice(0, 40)}...`
      : post.content;

    return {
      author: {
        firstName,
        secondName: lastName,
        photo: avatar,
        workPlace: `${workPlace.city.name}, ${workPlace.name}`,
      },
      /* ATM using cyrillic in DirectionEnum & PostTypeEnum, as returned by the
       * server to fix the mismatch below. Any other direction or post type 
       * is commented-out globally (temporarily).
       * Should instead use IDs from DirectionProperties.
       */
      // Type 'string' is not assignable to type 'DirectionEnum | undefined'.
      direction: post.mainDirection.name as DirectionEnum,
      // Type 'string' is not assignable to type 'PostTypeEnum'.
      postType: post.type.name as PostTypeEnum,
      title: post.title,
      content: post.content,
      preview,
      createdAt: new Date(date),
    };
  });

  dispatch(
    loadMaterials({
      posts: posts.concat(fetchedPosts),
      meta: {
        last: response.data.last,
        isLoading: false,
        pageNumber: response.data.number,
      },
    }),
  );
};

export const fetchCourses = (): AppThunkType => async (dispatch) => {
  try {
    const courses = await Promise.resolve(MOCK_COURSES);
    dispatch(loadCourses(courses));
  } catch (e) {
    console.log(e);
  }
};
