import { IExpert, LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsState } from '../materials/types';

export interface IExpertsData {
  expertIds: number[];
  meta: IExpertMeta;
  experts: {
    [id: string]: IExpert;
  };
}

export interface IExpertsState {
  data: IExpertsData;
  loading: LoadingStatusEnum;
  error: null | string;
  posts: IMaterialsState;
}
export interface IExpertMeta {
  totalPages: number;
  pageNumber: number;
  isLastPage: boolean;
  totalElements: number;
}
export interface IFetchExpertsOptions {
  page: number;
  regions: number[];
  directions: number[];
  appendExperts: boolean;
}

export interface IFetchExpertsMaterialsOptions {
  expertId: number;
  filters: {
    page: number;
    postTypes: number[];
    directions: number[];
  };
  // chips:
  page: number;
  appendPosts: boolean;
}
