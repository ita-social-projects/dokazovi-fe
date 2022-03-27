import { IDirection } from '../types';

export const sortByAlphabet = (
  array: IDirection[],
  sortBy: string | undefined = 'name',
): IDirection[] => {
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
