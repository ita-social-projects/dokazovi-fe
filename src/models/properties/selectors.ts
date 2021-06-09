import { RootStateType } from '../rootReducer';
import {
  IDirection,
  IOrigin,
  IPostTag,
  IPostType,
  IRegion,
} from '../../old/lib/types';

export const selectPostTypes = (state: RootStateType): IPostType[] =>
  state.properties.postTypes;
export const selectRegions = (state: RootStateType): IRegion[] =>
  state.properties.regions;
export const selectPostTags = (state: RootStateType): IPostTag[] =>
  state.properties.postTags;
export const selectDirections = (state: RootStateType): IDirection[] =>
  state.properties.directions;
export const selectOrigins = (state: RootStateType): IOrigin[] =>
  state.properties.origins;
