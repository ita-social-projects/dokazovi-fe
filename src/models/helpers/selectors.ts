import { IPost } from '../../old/lib/types';
import { store } from '../store';

export const selectPostsByIds = (ids: number[]): IPost[] => {
  return ids.map((id) => store.getState().materials.data.posts[id]);
};

export const selectExpertPostsByIds = (ids: number[]): IPost[] => {
  return ids.map((id) => store.getState().expertMaterials.data.posts[id]);
};
