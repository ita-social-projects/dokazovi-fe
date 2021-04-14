import { LoadingStatusEnum } from '../../lib/types';
import { IMaterialsState } from '../materials/types';

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

export interface IExpertsState {
  experts: IExpertPayload;
  materials: IMaterialsState;
}

export interface IFetchExpertsOptions {
  page: number;
  regions: number[];
  directions: number[];
}
