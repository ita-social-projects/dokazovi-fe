import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './baseURL';
import {
  GetResponseType,
  ImportantPostResponseType,
  LatestPostResponseType,
} from './types';

const instance = axios.create({
  baseURL: BASE_URL,
});

type GetPostConfigType = {
  params: {
    page?: number;
    size?: number;
    sort?: string[];
  };
};

type PostsTypeType = 'important' | 'latest';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetPostConfigType,
): Promise<
  AxiosResponse<
    GetResponseType<ImportantPostResponseType | LatestPostResponseType>
  >
> => {
  if (postsType === 'important') {
    return instance.get<GetResponseType<ImportantPostResponseType>>(
      `/post/${postsType}`,
      config,
    );
  }
  return instance.get<GetResponseType<LatestPostResponseType>>(
    `/post/${postsType}`,
    config,
  );
};

export const getExperts = () => {
  return instance.get(`/user/experts`);
};

export const getVersion = () => {
  return instance.get(`/version`);
};
