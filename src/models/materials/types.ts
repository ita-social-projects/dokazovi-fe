import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';

export interface IMaterialsData {
  postIds: number[];
  meta: IMaterialsMeta;
  posts: {
    [id: string]: IPost;
  };
}

export interface IMaterialsState {
  data: IMaterialsData;
  loading: LoadingStatusEnum;
  error: null | string;
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IFetchMaterialsOptions {
  filters: {
    page: number;
    postTypes: number[];
    directions: number[];
    origins: number[];
  };
  page: number;
  appendPosts: boolean;
}

export interface IMaterialsMeta {
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}
