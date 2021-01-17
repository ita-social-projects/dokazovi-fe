/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICheckboxes } from '../PostTopicSelector';

export interface IPostCreationState {
  // nest following inside 'article' & 'note'?
  topics: ICheckboxes;
  title: string;
  htmlContent: string;
  preview: string;
}

const initialState: IPostCreationState = {
  topics: {},
  title: '',
  htmlContent: '',
  preview: '',
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    // use same reducers for updating both article & note state ?
    saveNewPostDraft: (state, action: PayloadAction<IPostCreationState>) => {
      state = action.payload;
    },
    setPostTopics: (
      state,
      action: PayloadAction<IPostCreationState['topics']>,
    ) => {
      state.topics = action.payload;
    },
    setPostTitle: (
      state,
      action: PayloadAction<IPostCreationState['title']>,
    ) => {
      state.title = action.payload;
    },
    setPostBody: (
      state,
      action: PayloadAction<IPostCreationState['htmlContent']>,
    ) => {
      state.htmlContent = action.payload;
    },
  },
});

export const {
  saveNewPostDraft,
  setPostTopics,
  setPostTitle,
  setPostBody,
} = postCreationSlice.actions;

const postCreationReducer = postCreationSlice.reducer;
export default postCreationReducer;
