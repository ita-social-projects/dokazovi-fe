import { LoadingStatusEnum, QueryTypeEnum } from '../../lib/types';

export interface IExpertPayload {
  expertIds: number[];
  meta: IExpertMeta;
}

export interface IExpertMeta {
  totalPages?: number;
  pageNumber: number;
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface IMaterialsState {
  postIds: number[];
  meta: IMaterialsMeta;
  filters?: {
    [QueryTypeEnum.POST_TYPES]: number[];
  };
}

export interface IExpertsState {
  experts: IExpertPayload;
  materials: IMaterialsState;
}

export interface IFetchExpertsOptions {
  page: number;
  regions: number[];
  directions: number[];
}
