/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypeEnum } from '../../../lib/types';
import { ICheckboxes } from '../PostTopicSelector';

interface INewPostDraft {
  topics: ICheckboxes;
  title?: string;
  htmlContent: string;
  preview: string;
}

export interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewPostDraft;
  [PostTypeEnum.DOPYS]: INewPostDraft;
}

const initialState: IPostCreationState = {
  [PostTypeEnum.ARTICLE]: {
    topics: {},
    title: '',
    htmlContent: '',
    preview: '',
  },
  [PostTypeEnum.DOPYS]: {
    topics: {},
    htmlContent: '',
    preview: '',
  },
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    // saveNewPostDraft: (state, action: PayloadAction<IPostCreationState>) => {
    //   state = action.payload;
    // },
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
    setPostPreview: (
      state,
      action: PayloadAction<{
        postType: PostTypeEnum;
        value: INewPostDraft['preview'];
      }>,
    ) => {
      state[action.payload.postType].preview = action.payload.value;
    },
  },
});

export const {
  // saveNewPostDraft,
  setPostTopics,
  setPostTitle,
  setPostBody,
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;
export default postCreationReducer;
