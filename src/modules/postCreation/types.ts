import { PostTypeEnum } from '../../lib/types';

export interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewPostDraft;
  [PostTypeEnum.DOPYS]: INewPostDraft;
  [PostTypeEnum.VIDEO]: INewPostDraft;
}

export interface INewPostDraft {
  topics: string[];
  title?: string;
  isDone: boolean;
  htmlContent: string;
  preview: IPostPreview;
  videoUrl?: string;
  backgroundImageUrl?: string;
}

interface IPostPreview {
  value: string;
  isManuallyChanged: boolean;
}
