import { IExpert, LoadingStatusEnum } from '../../old/lib/types';

export interface IExpertsState {
  data: IExpertsData;
  meta: IExpertMeta;
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IExpertsData {
  expertIds: number[];
  experts: {
    [id: string]: IExpert;
  };
  totalPages: number;
  isLastPage: boolean;
  totalElements: number;
  pageNumber: number;
}

export const AuthorsListSortBy = {
  autorId: 'id',
  fullName: 'firstName,lastName',
  firstName: 'firstName',
  lastName: 'lastName',
  region: 'doctor.mainInstitution.city.region.name',
  city: 'doctor.mainInstitution.city.name',
  createdAt: 'createdAt',
  editedAt: 'editedAt',
};

export enum AutorsListOrder {
  desc = 'desc',
  asc = 'asc',
}

export interface ISortAutorsList {
  order: keyof typeof AutorsListOrder;
  sortBy: string;
}

export interface ITextFields {
  field: string;
  text: string;
}

export enum TextFieldsEnum {
  AUTHOR = 'author',
}

export interface IExpertMeta {
  size: number;
  sort: ISortAutorsList;
  textFields: {
    [key in TextFieldsEnum]: string;
  };
}

export interface IFetchExpertsOptions {
  page: number;
  regions: number[];
  directions: number[];
  appendExperts: boolean;
}

export interface IExpertsAutorsListOptions {
  page: number;
}
export interface IExpertsDeleteAutor {
  id: number;
}
