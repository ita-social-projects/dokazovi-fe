import { QueryTypeEnum, LoadingStatusEnum, IPost } from '../../lib/types';

export interface IMaterials {
  postIds: number[];
  meta: IMaterialsMeta;
}

export interface IMaterialsState extends IMaterials {
  posts: {
    [id: string]: IPost;
  };
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
