import { IExpert, IPost } from '../lib/types';
import { store } from './store';

export const selectPostsByIds = (ids: number[]): IPost[] => {
  return ids.map((id) => store.getState().data.posts[id]);
};

export const selectExpertsByIds = (ids: number[]): IExpert[] => {
  return ids.map((id) => store.getState().data.experts[id]);
};
