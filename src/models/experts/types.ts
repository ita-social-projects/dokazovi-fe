import { IExpert, LoadingStatusEnum } from '../../old/lib/types';

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
