import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from './baseURL';
import { GetImportantResponseType } from './types';

const instance = axios.create({
  baseURL: BASE_URL,
});

type GetImportantConfigType = {
  params: {
    page?: number;
    size?: number;
    sort?: string[];
  };
};

export const getImportant = (
  config?: GetImportantConfigType,
): Promise<AxiosResponse<GetImportantResponseType>> => {
  return instance.get<GetImportantResponseType>(`/post/important`, config);
};

export const getLatest = () => {
  return instance.get(`/post/latest`);
};

export const getExperts = () => {
  return instance.get(`/user/experts`);
};

export const getVersion = () => {
  return instance.get(`/version`);
};

getImportant().then((res) => res.data);
