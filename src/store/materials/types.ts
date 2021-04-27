import { QueryTypeEnum, LoadingStatusEnum, IPost } from '../../lib/types';

export interface IMaterials {
  postIds: number[];
  meta: IMaterialsMeta;
}

export interface IMaterialsStatesXXX extends IMaterials {
  posts: {
    [id: string]: IPost;
  };
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

interface IData {
  postIds: number[];
  meta: IMaterialsMeta;
  posts: {
    [id: string]: IPost;
  };
}

export interface IMaterialsState {
  data: IData;
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
  };
  page: number;
  appendPosts: boolean;
}

export interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}
