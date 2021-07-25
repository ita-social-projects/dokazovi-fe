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

export type FilterConfigType = {
  id: string;
  name: string;
  checked: boolean | null;
};

export interface IFilter {
  page: number;
  isAllFiltersChecked: boolean;
  filterConfig: FilterConfigType[];
}

export interface IMaterialsDataDraft extends Omit<IMaterialsData, 'filters'> {
  status: string;
  materialsDraft: IPost[];
  filters: IFilter;
}

export interface IMaterialsDataPublished
  extends Omit<IMaterialsData, 'filters'> {
  status: string;
  materialsPublished: IPost[];
  filters: IFilter;
}

export interface IMaterialsStateDraft {
  data: IMaterialsDataDraft;
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IMaterialsStatePublished {
  data: IMaterialsDataPublished;
  loading: LoadingStatusEnum;
  error: null | string;
}
