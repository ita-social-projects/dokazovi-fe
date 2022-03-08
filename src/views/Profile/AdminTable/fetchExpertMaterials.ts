import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { IPost } from '../../../old/lib/types';

interface IResponse {
  data: {
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
  };
  config: AxiosRequestConfig;
  status: number;
  statusText: string;
  request?: any;
  headers?: any;
}

const baseUrl =
  'https://dokazovi-be-release.herokuapp.com:443/api/post/latest-by-expert?expert=';

export const fetchExpertMaterials = async (id: number) => {
  try {
    // я не уверен на счет типизации ниже, пытался шото но толку не много, оставил на всякий;
    const response: AxiosResponse<IResponse> = await axios.get(
      `${baseUrl}${id}`,
    );
    const postsData = response.data;
    console.log(postsData);

    // необходимо из postsData вытянуть postsData.content (это массив статей)
    // и после пройтись по нему мапом и вытянуть id из каждого поста
    // после чего в конце функция должна вернуть и посты, и айди к ним
    // return { posts, postIds };
  } catch (error) {
    console.error(error);
  }
};
