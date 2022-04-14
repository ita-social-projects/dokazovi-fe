import axios from 'axios';
import { IPost } from '../../old/lib/types';

const baseUrl =
  'https://dokazovi-be-release.herokuapp.com:443/api/post/all-posts?size=100&title=';

export const fetchPostsByTitle = async (title: string) => {
  const postsData = await axios.get(`${baseUrl}${title}`);
  const posts: IPost[] = postsData.data.content;

  return posts;
};
