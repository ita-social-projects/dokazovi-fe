import { LoadingStatusEnum, IExpert } from '../../old/lib/types';
import { IMaterialsState } from '../materials/types';

export interface IExpertPayload {
  expertIds: number[];
  meta: IExpertMeta;
}

export interface IData {
  expertIds: number[];
  meta: IExpertMeta;
  experts: {
    [id: string]: IExpert;
  };
}

export interface IExpertsState {
  data: IData;
  loading: LoadingStatusEnum;
  error: null | string;
  // experts: IExpertPayload;
  posts: IMaterialsState;
}
export interface IExpertMeta {
  totalPages: number;
  pageNumber: number;
  loading: LoadingStatusEnum;
  error: null | string;
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
  page: number;
  appendPosts: boolean;
}
