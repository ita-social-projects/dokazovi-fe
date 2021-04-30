import { QueryTypeEnum, LoadingStatusEnum } from '../../lib/types';

export interface IMaterialsState {
  postIds: number[];
  meta: IMaterialsMeta;
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

export interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}
