import { RootStateType } from '../rootReducer';
import {
  IDirection,
  IOrigin,
  IPostTag,
  IPostType,
  IRegion,
  IPostStatus,
  ICity,
} from '../../old/lib/types';

export const selectPostTypes = (state: RootStateType): IPostType[] =>
  state.properties.postTypes;
export const selectRegions = (state: RootStateType): IRegion[] =>
  state.properties.regions;
export const selectCities = (state: RootStateType): ICity[] =>
  state.properties.cities;
export const selectPostTags = (state: RootStateType): IPostTag[] =>
  state.properties.postTags;
export const selectDirections = (state: RootStateType): IDirection[] =>
  state.properties.directions;
export const selectOrigins = (state: RootStateType): IOrigin[] =>
  state.properties.origins;
export const selectPostStatuses = (state: RootStateType): IPostStatus[] =>
  state.properties.statuses;
