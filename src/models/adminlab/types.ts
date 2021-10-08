import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';

export interface IAdminPost extends IPost {
  modifideViewsCounter?: number;
}

export interface IAdminlab {
  data: IAdminlabData;
  loading: LoadingStatusEnum;
  error: string | null;
}

export interface IAdminlabData {
  postIds: number[];
  posts: IPostsOBJ;
}

export interface IPostsOBJ {
  [id: string]: IPost;
}

export interface IMyKnownError {
  errorMessage: string;
}

export interface IGetMatirealsAction {
  posts: IPostsOBJ;
  ids: number[];
}
