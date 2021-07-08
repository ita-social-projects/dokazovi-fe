import {
  IDirection,
  IRegion,
  filtersStateEnum,
  IOrigin,
  IPostType,
} from '../../lib/types';
import { CheckboxFormStateType } from '../../lib/components/Filters/CheckboxFilterForm';

export const updateDir = (
  selectedDirections: IDirection[] | filtersStateEnum,
  directions: IDirection[],
): CheckboxFormStateType => {
  if (typeof selectedDirections !== 'string') {
    return directions.reduce((acc, next) => {
      if (typeof selectedDirections !== 'string') {
        acc[next.id] = Boolean(
          selectedDirections.find((filter) => filter.id === next.id),
        );
      }
      return acc;
    }, {});
  }
  if (selectedDirections === filtersStateEnum.empty) {
    return directions.reduce((acc, next) => {
      acc[next.id] = false;
      return acc;
    }, {});
  }
  return directions.reduce((acc, next) => {
    acc[next.id] = true;
    return acc;
  }, {});
};

export const updateReg = (
  selectedRegions: IRegion[] | filtersStateEnum,
  regions: IRegion[],
): CheckboxFormStateType => {
  if (typeof selectedRegions !== 'string') {
    return regions.reduce((acc, next) => {
      if (typeof selectedRegions !== 'string') {
        acc[next.id] = Boolean(
          selectedRegions.find((filter) => filter.id === next.id),
        );
      }
      return acc;
    }, {});
  }
  if (selectedRegions === filtersStateEnum.empty) {
    return regions.reduce((acc, next) => {
      acc[next.id] = false;
      return acc;
    }, {});
  }
  return regions.reduce((acc, next) => {
    acc[next.id] = true;
    return acc;
  }, {});
};

export const updateOrig = (
  selectedOrigins: IOrigin[] | filtersStateEnum,
  origins: IOrigin[],
): CheckboxFormStateType => {
  if (typeof selectedOrigins !== 'string') {
    return origins.reduce((acc, next) => {
      if (typeof selectedOrigins !== 'string') {
        acc[next.id] = Boolean(
          selectedOrigins.find((filter) => filter.id === next.id),
        );
      }
      return acc;
    }, {});
  }
  if (selectedOrigins === filtersStateEnum.empty) {
    return origins.reduce((acc, next) => {
      acc[next.id] = false;
      return acc;
    }, {});
  }
  return origins.reduce((acc, next) => {
    acc[next.id] = true;
    return acc;
  }, {});
};

export const updatePostTypes = (
  selectedPostTypes: IPostType[] | filtersStateEnum,
  postTypes: IPostType[],
): CheckboxFormStateType => {
  if (typeof selectedPostTypes !== 'string') {
    return postTypes.reduce((acc, next) => {
      if (typeof selectedPostTypes !== 'string') {
        acc[next.id] = Boolean(
          selectedPostTypes.find((filter) => filter.id === next.id),
        );
      }
      return acc;
    }, {});
  }
  if (selectedPostTypes === filtersStateEnum.empty) {
    return postTypes.reduce((acc, next) => {
      acc[next.id] = false;
      return acc;
    }, {});
  }
  return postTypes.reduce((acc, next) => {
    acc[next.id] = true;
    return acc;
  }, {});
};
