import { IPostType, IOrigin, IDirection } from '../types';

export const sortByAlphabet = (
  array: IPostType[] | IOrigin[] | IDirection[],
  sortBy: string | undefined = 'name',
): any[] => {
  return array?.sort((prev, current) => {
    if (prev[sortBy] > current[sortBy]) {
      return 1;
    }
    if (prev[sortBy] < current[sortBy]) {
      return -1;
    }
    return 0;
  });
};
