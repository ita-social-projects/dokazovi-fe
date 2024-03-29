import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialFilter from './MaterialFilter';
import { useStyles } from '../styles/FilterSection.styles';
import {
  fetchMaterialsImportant,
  resetMaterialsImportant,
} from '../../../../../../models/materialsImportant';
import { RootStateType } from '../../../../../../models/rootReducer';
import {
  AdminPageFiltersType,
  IFilterOption,
  QueryTypeEnum,
} from '../../../../types';
import { usePrevious } from '../../../../hooks/usePrevious';
import { useActions } from '../../../../../../shared/hooks';

interface IFilterEntry {
  id: number;
  name: string;
  label?: string;
}

interface IGeneralFilterState {
  origins: number[];
  directions: number[];
  types: number[];
}

interface IFilterSectionProps {
  isTouched: boolean;
  page: number;
  resetPage: () => void;
}

const FilterSection: React.FC<IFilterSectionProps> = ({
  isTouched,
  page,
  resetPage,
}) => {
  const classes = useStyles();
  const [
    boundFetchMaterialsImportant,
    boundResetMaterialsImportant,
  ] = useActions([fetchMaterialsImportant, resetMaterialsImportant]);
  const previousPage = usePrevious(page);
  const [generalFilterState, setGeneralFilterState] = useState<
    IGeneralFilterState
  >({
    origins: [],
    directions: [],
    types: [],
  });

  useEffect(() => {
    const fetchOptions = {
      filters: {
        page: 0,
        directions: generalFilterState.directions,
        origins: generalFilterState.origins,
        postTypes: generalFilterState.types,
      },
      page,
      appendPosts: page !== previousPage && page !== 0,
    };

    if (isTouched) {
      boundFetchMaterialsImportant(fetchOptions);
    }
  }, [JSON.stringify(generalFilterState), page, isTouched]);

  useEffect(() => {
    return () => {
      boundResetMaterialsImportant();
    };
  }, []);

  const originOptions = useSelector(
    (state: RootStateType) => state.properties.origins,
  );
  const directionOptions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const postTypeOptions = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

  const mapToFilterOptions = (optionsArray: IFilterEntry[]): IFilterOption[] =>
    optionsArray.map((option) => ({
      label: option.label || option.name,
      value: option.id,
      chipValue: option.name,
    }));

  const originFilterOptions: IFilterOption[] = mapToFilterOptions(
    originOptions,
  );
  const directionFilterOptions: IFilterOption[] = mapToFilterOptions(
    directionOptions,
  );
  const typeFilterOptions: IFilterOption[] = mapToFilterOptions(
    postTypeOptions,
  );

  const submitFilters = (
    filterName: AdminPageFiltersType,
    filterOptions: number[],
  ) => {
    if (
      JSON.stringify(generalFilterState[filterName]) !==
      JSON.stringify(filterOptions)
    ) {
      setGeneralFilterState({
        ...generalFilterState,
        [filterName]: filterOptions,
      });
      resetPage();
    }
  };

  return (
    <div className={classes.filterSection}>
      <MaterialFilter
        filterLabel="За джерелом"
        filterName={QueryTypeEnum.ORIGINS}
        filterOptions={originFilterOptions}
        submitFilters={submitFilters}
      />
      <MaterialFilter
        filterLabel="За темою"
        filterName={QueryTypeEnum.DIRECTIONS}
        filterOptions={directionFilterOptions}
        submitFilters={submitFilters}
      />
      <MaterialFilter
        filterLabel="За типом"
        filterName={QueryTypeEnum.POST_TYPES}
        filterOptions={typeFilterOptions}
        submitFilters={submitFilters}
      />
    </div>
  );
};

export default FilterSection;
