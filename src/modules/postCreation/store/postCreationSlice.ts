/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypeEnum } from '../../../lib/types';

export interface INewPostDraft {
  topics: string[];
  title?: string;
  htmlContent: string;
  preview: IPostPreview;
}

interface IPostPreview {
  value: string;
  isManuallyChanged: boolean;
}

export interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewPostDraft;
  [PostTypeEnum.DOPYS]: INewPostDraft;
}

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    topics: [],
    title: '',
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
  },
  [PostTypeEnum.DOPYS]: {
    topics: [],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
  },
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    setPostTopics: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['topics'];
      }>,
    ) => {
      state[action.payload.postType].topics = action.payload.value;
    },
    setPostTitle: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['title'];
      }>,
    ) => {
      state[action.payload.postType].title = action.payload.value;
    },
    setPostBody: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['htmlContent'];
      }>,
    ) => {
      state[action.payload.postType].htmlContent = action.payload.value;
    },
    setPostPreviewText: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['preview']['value'];
      }>,
    ) => {
      state[action.payload.postType].preview.value = action.payload.value;
    },
    setPostPreviewManuallyChanged: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['preview']['isManuallyChanged'];
      }>,
    ) => {
      state[action.payload.postType].preview.isManuallyChanged =
        action.payload.value;
    },
  },
});

export const {
  setPostTopics,
  setPostTitle,
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;
export default postCreationReducer;
