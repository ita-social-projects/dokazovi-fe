/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IDirection, IExpert, ICourse, IPost } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';
import { MOCK_COURSES } from '../courses/directionCourses.mock';
import { getPosts, getExperts } from '../../../lib/utilities/API/api';
import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import { postTypeProperties } from '../../../lib/constants/post-type-properties';

export interface IDirectionsState extends Record<string, IDirectionState> {
  [key: string]: IDirectionState;
}

export interface IDirectionState {
  courses: ICourse[];
  experts: IExpert[];
  materials: IMaterialsState;
}

const initialDirectionState: IDirectionState = {
  experts: [],
  materials: {
    posts: [],
    meta: {
      isLastPage: false,
      isLoading: false,
      pageNumber: -1,
    },
  },
  courses: [],
};

interface IMaterialsState {
  posts: IPost[];
  meta: {
    isLastPage: boolean;
    isLoading: boolean;
    pageNumber: number;
  };
}

export const directionsSlice = createSlice({
  name: 'direction',
  initialState: {} as IDirectionsState,
  reducers: {
    setupDirection: (state, action: PayloadAction<string>) => {
      // TODO: use latin direction names, create labels for cyrillic?
      if (!state[action.payload]) state[action.payload] = initialDirectionState;
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
    loadCourses: (
      state,
      action: PayloadAction<{
        courses: ICourse[];
        directionName: string;
      }>,
    ) => {
      const { directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.courses = action.payload.courses;
      }
    },
    setMaterialsLoadingStatus: (state, action: PayloadAction<IDirection>) => {
      state[action.payload.name].materials.meta.isLoading = true;
    },
    loadMaterials: (
      state,
      action: PayloadAction<{
        materials: IMaterialsState;
        directionName: string;
      }>,
    ) => {
      const { directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.materials = action.payload.materials;
      }
    },
  },
});

export const {
  setMaterialsLoadingStatus,
  loadMaterials,
  loadExperts,
  loadCourses,
  setupDirection,
} = directionsSlice.actions;

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

    const experts = loadedExperts.data.content.map((expert) => ({
      ...(expert as IExpert),
    }));

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

export const fetchCourses = (directionName: string): AppThunkType => async (
  dispatch,
) => {
  try {
    const courses = await Promise.resolve(MOCK_COURSES);
    dispatch(
      loadCourses({
        directionName,
        courses,
      }),
    );
  } catch (e) {
    console.log(e);
  }
};

// TODO: use createAsyncThunk
export const fetchMaterials = (
  direction: IDirection,
  checkedTypes: number[],
  shouldAdd: boolean,
): AppThunkType => async (dispatch, getState) => {
  const { posts, meta } = getState().directions[direction.name].materials;

  const response = await getPosts('latest-by-direction', {
    params: {
      direction: direction.id,
      page: shouldAdd ? meta.pageNumber + 1 : 0,
      size: LOAD_POSTS_LIMIT,
      type: checkedTypes,
    },
  });

  const fetchedPosts: IPost[] = response.data.content.map((post) => {
    const author = _.pick(post.author, [
      'avatar',
      'firstName',
      'id',
      'lastName',
      'mainInstitution',
    ]);

    const preview = _.truncate(post.content, {
      length: 150, // TODO: use MAX_LEN constant
    });

    return {
      author,
      mainDirection: DIRECTION_PROPERTIES[post.mainDirection.id.toString()],
      postType: postTypeProperties[post.type.id.toString()],
      title: post.title,
      content: post.content,
      preview,
      createdAt: post.createdAt,
    };
  });

  dispatch(
    loadMaterials({
      directionName: direction.name,
      materials: {
        posts: shouldAdd ? posts.concat(fetchedPosts) : fetchedPosts,
        meta: {
          isLastPage: response.data.last,
          isLoading: false,
          pageNumber: response.data.number,
        },
      },
    }),
  );
};
