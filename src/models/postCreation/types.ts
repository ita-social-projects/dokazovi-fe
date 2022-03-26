import { IDirection, IOrigin, PostTypeEnum } from '../../old/lib/types';

export interface INewPostDraft {
  previewImageUrl?: string;
  importantImageUrl?: string;
  importantMobileImageUrl?: string;
  title: string;
  directions: IDirection[];
  origins: IOrigin[];
  htmlContent: string;
  preview: IPostPreview;
  authorsName: string;
  authorsDetails: string;
  authorId?: number | null;
  videoUrl?: string;
}

export interface IPostPreview {
  value: string;
  isManuallyChanged: boolean;
}

export interface INewArticlePostDraft extends INewPostDraft {}

export interface INewDopysPostDraft extends INewPostDraft {}

export interface INewVideoPostDraft extends INewPostDraft {
  videoUrl: string;
}

export interface IPostCreationState {
  [PostTypeEnum.ARTICLE]: INewArticlePostDraft;
  [PostTypeEnum.DOPYS]: INewDopysPostDraft;
  [PostTypeEnum.VIDEO]: INewVideoPostDraft;
}
