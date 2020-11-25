export interface IPostResponseType {
  id: number;
  title: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    mainInstitution: {
      id: number;
      name: string;
      city: {
        id: number;
        name: string;
      };
    };
  };
  type: {
    id: number;
    name: string;
  };
  createdAt: string;
  direction: {
    id: number;
    name: string;
  };
}

export type GetImportantResponseType = {
  content: IPostResponseType[];
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    unsorted: false;
    sorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
