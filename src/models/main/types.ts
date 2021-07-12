import { IPost, LoadingStatusEnum } from '../../old/lib/types';

export interface INewestPostsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface INewestPostsPayload {
  newestPostIds: number[];
  newestPosts: {
    [id: string]: IPost;
  };
}

export interface IFetchNewestPosts {
  loadedPostIds: number[];
}

export interface IImportantPostsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IImportantPostsPayload {
  importantPostIds: number[];
  importantPosts: {
    [id: string]: IPost;
  };
}

export interface IMainState {
  newest: INewestPostsPayload;
  important: IImportantPostsPayload;
  setImportant: {
    message?: string;
    success?: boolean;
  };
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface ISetImportantPostsOptions {
  posts: string;
}
