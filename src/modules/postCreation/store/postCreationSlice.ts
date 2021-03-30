/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypeEnum } from '../../../lib/types';
import { INewPostDraft, IPostCreationState } from '../types';

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    topics: [],
    title: '',
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    previewImageUrl: '',
  },
  [PostTypeEnum.DOPYS]: {
    topics: [],
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    previewImageUrl: '',
  },
  [PostTypeEnum.VIDEO]: {
    topics: [],
    title: '',
    htmlContent: '',
    preview: { value: '', isManuallyChanged: false },
    videoUrl: '',
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
    setIsDone: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['isDone'];
      }>,
    ) => {
      state[action.payload.postType].isDone = action.payload.value;
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
    setVideoUrl: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['videoUrl'];
      }>,
    ) => {
      state[action.payload.postType].videoUrl = action.payload.value;
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
  setPostTopics,
  setPostTitle,
  setIsDone,
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  setVideoUrl,
  setImageUrl,
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;
export default postCreationReducer;
