import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';

export interface IAdminPost extends IPost {
  modifideViewsCounter?: number;
  status: string;
}

export interface IAdminlab {
  data: IAdminlabData;
  meta: IAdminLabMeta;
  loading: LoadingStatusEnum;
  error: string | null;
}

export interface IAdminLabMeta {
  sort: ISort;
  filters: {
    [key in QueryTypeEnum]?: number[];
  };
  page: number;
}

export interface IFilter {
  filter: string;
  options: number[];
}

export interface ISort {
  order: keyof typeof Order;
  sortBy: keyof typeof SortBy;
}

export interface IAdminlabData {
  totalPages: number;
  postIds: number[];
  posts: IPostsOBJ;
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
  modified_at = 'modified_at',
}

export enum Order {
  desc = 'desc',
  asc = 'asc',
}
