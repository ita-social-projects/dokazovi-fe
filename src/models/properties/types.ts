import {
  IDirection,
  IOrigin,
  IPostTag,
  IPostType,
  IRegion,
  IPostStatus,
  ICity,
} from '../../old/lib/types';

export interface IPropertiesState {
  postTypes: IPostType[];
  regions: IRegion[];
  cities: ICity[];
  postTags: IPostTag[];
  directions: IDirection[];
  origins: IOrigin[];
  statuses: IPostStatus[];
}
