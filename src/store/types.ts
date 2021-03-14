import { LoadingStatusEnum } from '../lib/types';

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
}
