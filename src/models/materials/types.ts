import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';

export interface IMaterialsData {
  postIds: number[];
  meta: IMaterialsMeta;
  posts: {
    [id: string]: IPost;
  };
}

export interface IMaterialsDataWithFilters {
  data: IMaterialsData;
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IMaterialsState extends IMaterialsDataWithFilters {
  loading: LoadingStatusEnum;
  error: null | string;
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
