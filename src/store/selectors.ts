import { IPost } from '../lib/types';
import { store } from './store';

export const selectPostsByIds = (ids: string[]): IPost[] => {
  return ids.map((id) => store.getState().data.posts[id]);
};
