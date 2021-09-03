import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';
import { GetPostsRequestType } from '../../old/lib/utilities/API/api';

export interface IMaterialsData {
  postIds: number[];
  meta: IMaterialsMeta;
  posts: {
    [id: string]: IPost;
  };
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IMaterialsState {
  data: IMaterialsData;
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
  url: GetPostsRequestType;
  type?:string;
}

export interface IMaterialsMeta {
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export type FilterConfigType = {
  id: string;
  name: string;
  checked: boolean | null;
};

export interface IFilterByStatus {
  page: number;
  isAllFiltersChecked: boolean;
  filterConfig: FilterConfigType[];
}
