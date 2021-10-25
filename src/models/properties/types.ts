import {
  IDirection,
  IOrigin,
  IPostTag,
  IPostType,
  IRegion,
  IPostStatus,
} from '../../old/lib/types';

export interface IPropertiesState {
  postTypes: IPostType[];
  regions: IRegion[];
  postTags: IPostTag[];
  directions: IDirection[];
  origins: IOrigin[];
  statuses: IPostStatus[];
}
