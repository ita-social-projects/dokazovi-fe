import { IExpert, IPost } from '../lib/types';
import { store } from './store';

export const selectPostsByIds = (ids: string[]): IPost[] => {
  return ids.map((id) => store.getState().data.posts[id]);
};

export const selectExpertsByIds = (ids: string[]): IExpert[] => {
  return ids.map((id) => store.getState().data.experts[id]);
};
