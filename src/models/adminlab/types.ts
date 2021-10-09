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
  sort: {
    order: keyof typeof Order;
    sortBy: keyof typeof SortBy;
  };
  filters: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IFechedAdminMatirealOptions {
  sortBy: keyof typeof SortBy;
  order: keyof typeof Order;
  filters: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IPostsOBJ {
  [id: string]: IAdminPost;
}

export interface IMyKnownError {
  errorMessage: string;
}

export enum SortBy {
  published_at = 'published_at',
  post_id = 'post_id',
  type_id = 'title',
  title = 'title',
  content = 'content',
  status = 'status',
  important = 'important',
  created_at = 'created_at',
  modifide_at = ' modifide_at',
}

export enum Order {
  desc = 'desc',
  asc = 'asc',
}
