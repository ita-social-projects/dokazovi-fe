import { IPost, LoadingStatusEnum } from '../../old/lib/types';
import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';
import { IFilterByStatus, IMaterialsData } from '../materials/types';

export interface IFetchExpertsMaterialsByStatusOptions
  extends Omit<IFetchExpertsMaterialsOptions, 'filters'> {
  status: string;
  filters: IFilterByStatus;
}

export interface IMaterialsDataByStatus
  extends Omit<IMaterialsData, 'filters' | 'posts'> {
  posts: IPost[];
  status: string;
  filters: IFilterByStatus;
}

export interface IMaterialsStateByStatus {
  data: IMaterialsDataByStatus;
  loading: LoadingStatusEnum;
  error: null | string;
}
