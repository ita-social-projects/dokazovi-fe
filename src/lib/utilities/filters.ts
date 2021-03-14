import { FilterTypeEnum, QueryTypeEnum } from '../types';

export const getQueryTypeByFilterType = (
  filterType: FilterTypeEnum,
): QueryTypeEnum => {
  switch (filterType) {
    case FilterTypeEnum.POST_TYPES:
      return QueryTypeEnum.POST_TYPES;
    case FilterTypeEnum.DIRECTIONS:
      return QueryTypeEnum.DIRECTIONS;
    case FilterTypeEnum.REGIONS:
      return QueryTypeEnum.REGIONS;
    case FilterTypeEnum.TAGS:
      return QueryTypeEnum.TAGS;
    default:
      throw new Error('Could not find the corresponding query type');
  }
};

export const mapQueryIdsStringToArray = (ids: string | null): number[] =>
  ids ? ids.split(',').map(Number).filter(Number.isInteger) : [];
