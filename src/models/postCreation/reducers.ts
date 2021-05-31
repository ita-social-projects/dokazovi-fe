/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirection, IOrigin, PostTypeEnum } from '../../old/lib/types';
import { INewPostDraft, IPostCreationState } from './types';

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    title: '',
    directions: [],
    origins: [
      {
        id: 1,
        name: 'Думка експерта',
        parameter: null,
      },
    ],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    previewImageUrl: '',
    authorsName: '',
    authorsDetails: '',
    authorId: null,
  },
  [PostTypeEnum.DOPYS]: {
    title: '',
    directions: [],
    origins: [
      {
        id: 1,
        name: 'Думка експерта',
        parameter: null,
      },
    ],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    previewImageUrl: '',
    authorsName: '',
    authorsDetails: '',
    authorId: null,
  },
  [PostTypeEnum.VIDEO]: {
    title: '',
    directions: [],
    origins: [
      {
        id: 1,
        name: 'Думка експерта',
        parameter: null,
      },
    ],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    videoUrl: '',
    authorsName: '',
    authorsDetails: '',
    authorId: null,
  },
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    resetDraft: (state, action: PayloadAction<PostTypeEnum>) => {
      if (action.payload === PostTypeEnum.ARTICLE)
        state[PostTypeEnum.ARTICLE] = initialState[PostTypeEnum.ARTICLE];
      if (action.payload === PostTypeEnum.DOPYS)
        state[PostTypeEnum.DOPYS] = initialState[PostTypeEnum.DOPYS];
      if (action.payload === PostTypeEnum.VIDEO)
        state[PostTypeEnum.VIDEO] = initialState[PostTypeEnum.VIDEO];
    },
    setPostDirections: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: IDirection[];
      }>,
    ) => {
      state[action.payload.postType].directions = action.payload.value;
    },
    setPostOrigin: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: IOrigin[];
      }>,
    ) => {
      state[action.payload.postType].origins = action.payload.value;
    },
    setPostTitle: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: string;
      }>,
    ) => {
      state[action.payload.postType].title = action.payload.value;
    },
    setAuthorsName: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: string;
      }>,
    ) => {
      state[action.payload.postType].authorsName = action.payload.value;
    },
    setAuthorsDetails: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: string;
      }>,
    ) => {
      state[action.payload.postType].authorsDetails = action.payload.value;
    },
    setPostBody: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: string;
      }>,
    ) => {
      state[action.payload.postType].htmlContent = action.payload.value;
    },
    setPostPreviewText: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: string;
      }>,
    ) => {
      state[action.payload.postType].preview.value = action.payload.value;
    },
    setPostPreviewManuallyChanged: (
      state,
      action: PayloadAction<PostTypeEnum>,
    ) => {
      state[action.payload].preview.isManuallyChanged = true;
    },
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state[PostTypeEnum.VIDEO].videoUrl = action.payload;
    },
    setImageUrl: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['previewImageUrl'];
      }>,
    ) => {
      state[action.payload.postType].previewImageUrl = action.payload.value;
    },
    setAuthorId: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['authorId'];
      }>,
    ) => {
      state[action.payload.postType].authorId = action.payload.value;
    },
  },
});

export const {
  resetDraft,
  setPostDirections,
  setPostOrigin,
  setPostTitle,
  setAuthorsName,
  setAuthorsDetails,
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  setVideoUrl,
  setImageUrl,
  setAuthorId,
} = postCreationSlice.actions;

export const postCreationReducer = postCreationSlice.reducer;
