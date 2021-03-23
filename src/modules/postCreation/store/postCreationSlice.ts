/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDirection, PostTypeEnum } from '../../../lib/types';

interface INewPostDraft {
  title: string;
  directions: IDirection[];
  isDone: boolean;
  htmlContent: string;
  preview: IPostPreview;
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

interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewArticlePostDraft;
  [PostTypeEnum.DOPYS]: INewDopysPostDraft;
  [PostTypeEnum.VIDEO]: INewVideoPostDraft;
}

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    title: '',
    directions: [],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    isDone: false,
  },
  [PostTypeEnum.DOPYS]: {
    title: '',
    directions: [],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    isDone: false,
  },
  [PostTypeEnum.VIDEO]: {
    title: '',
    directions: [],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    isDone: false,
    videoUrl: '',
  },
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    setPostDirections: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: IDirection[];
      }>,
    ) => {
      state[action.payload.postType].directions = action.payload.value;
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
    setIsDone: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: boolean;
      }>,
    ) => {
      state[action.payload.postType].isDone = action.payload.value;
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
  },
});

export const {
  setPostDirections,
  setPostTitle,
  setIsDone,
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  setVideoUrl,
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;

export default postCreationReducer;
