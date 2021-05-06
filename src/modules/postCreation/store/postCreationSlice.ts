/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirection, IOrigin, PostTypeEnum } from '../../../lib/types';

interface INewPostDraft {
  previewImageUrl?: string;
  title: string;
  directions: IDirection[];
  origin: IOrigin[];
  htmlContent: string;
  preview: IPostPreview;
  authorsName: string;
  authorsDetails: string;
}

interface IPostPreview {
  value: string;
  isManuallyChanged: boolean;
}

interface INewArticlePostDraft extends INewPostDraft {}

interface INewDopysPostDraft extends INewPostDraft {}

interface INewVideoPostDraft extends INewPostDraft {
  videoUrl: string;
}

export interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewArticlePostDraft;
  [PostTypeEnum.DOPYS]: INewDopysPostDraft;
  [PostTypeEnum.VIDEO]: INewVideoPostDraft;
}

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    title: '',
    directions: [],
    origin: [
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
  },
  [PostTypeEnum.DOPYS]: {
    title: '',
    directions: [],
    origin: [
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
  },
  [PostTypeEnum.VIDEO]: {
    title: '',
    directions: [],
    origin: [
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
      state[action.payload.postType].origin = action.payload.value;
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
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;

export default postCreationReducer;
