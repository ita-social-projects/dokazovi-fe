import axios, { AxiosResponse } from 'axios';
import { IPost } from '../../../old/lib/types';

interface IPostsData {
  content: IPost[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable?: any;
  size: number;
  sort?: any;
  totalElements: number;
  totalPages: number;
}

interface IReturn {
  authorPosts: IPost[];
  authorPostIds: number[];
}

const baseUrl =
  'https://dokazovi-be-release.herokuapp.com:443/api/post/latest-by-expert?expert=';

export const fetchExpertMaterials = async (id: number): Promise<IReturn> => {
  const response: AxiosResponse<IPostsData> = await axios.get(
    `${baseUrl}${id}`,
  );
  const authorPosts = response.data.content;
  const authorPostIds = authorPosts.map((post) => post.id);

  return { authorPosts, authorPostIds };
};
