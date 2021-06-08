import { IExpert, LoadingStatusEnum } from '../../old/lib/types';
import { IInitialMaterialsState } from '../materials/types';

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
  posts: IInitialMaterialsState;
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
    type: number[];
    directions: number[];
  };
  page: number;
  appendPosts: boolean;
}
