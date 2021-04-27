import { LoadingStatusEnum } from '../../lib/types';
import { IMaterials, IMaterialsState } from '../materials/types';

export interface IExpertPayload {
  expertIds: number[];
  meta: IExpertMeta;
}

export interface IExpertMeta {
  totalPages: number;
  pageNumber: number;
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  totalElements: number;
}

export interface IExpertsState {
  experts: IExpertPayload;
  materials: IMaterials;
}

export interface IFetchExpertsOptions {
  page: number;
  regions: number[];
  directions: number[];
  appendExperts: boolean;
}
