export type LatestPostResponseType = {
  author: {
    avatar: string;
    firstName: string;
    id: number;
    lastName: string;
    mainInstitution: {
      city: {
        id: number;
        name: string;
      };
      id: number;
      name: string;
    };
  };
  content: string;
  createdAt: string;
  direction: {
    id: number;
    name: string;
  };
  id: number;
  title: string;
  type: {
    id: number;
    name: string;
  };
};

export type ImportantPostResponseType = Omit<LatestPostResponseType, 'content'>;

export type GetResponseType<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};

export type ExpertsResponseType = {
  content: [
    {
      avatar: string;
      firstName: string;
      id: number;
      lastAddedPost: {
        id: number;
        title: string;
      };
      lastName: string;
      mainDirection: {
        id: number;
        name: string;
      };
      mainInstitution: {
        city: {
          id: number;
          name: string;
        };
        id: number;
        name: string;
      };
      qualification: string;
    },
  ];
};
