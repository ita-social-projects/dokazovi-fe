import axios from 'axios';
import { IPost } from '../../old/lib/types';

interface IPostsResponse {
  content: IPost[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: 100;
  sort: any;
  totalElements: number;
  totalPages: number;
}

const resultsAmount = 100;
const baseUrl = `https://dokazovi-be-release.herokuapp.com:443/api/post/all-posts?size=${resultsAmount}&title=`;

export const fetchPostsByTitle = async (title: string): Promise<IPost[]> => {
  const postsData = await axios.get<IPostsResponse>(`${baseUrl}${title}`);
  const posts: IPost[] = postsData.data.content;

  return posts;
};
