import { IPost, LoadingStatusEnum, QueryTypeEnum } from '../../old/lib/types';
import { GetPostsRequestType } from '../../old/lib/utilities/API/api';

// export interface IInitialMaterialsState {
//   data: IInitialMaterialsData;
// }

// export interface IInitialMaterialsData {
//   postIds: number[];
//   meta: IMaterialsMeta;
//   posts: {
//     [id: string]: IPost;
//   };
//   loading: LoadingStatusEnum;
//   error: null | string;
//   filters?: {
//     [key in QueryTypeEnum]?: number[];
//   };
// }

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

// export interface IMaterialsDataWithFilters {
//   data: IMaterialsData;
//   filters?: {
//     [key in QueryTypeEnum]?: number[];
//   };
// }

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
}

export interface IMaterialsMeta {
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface IMaterialsDataByStatus extends IMaterialsData {
  status: string;
}
export interface IMaterialsStateByStatus {
  data: IMaterialsDataByStatus;
  loading: LoadingStatusEnum;
  error: null | string;
}
