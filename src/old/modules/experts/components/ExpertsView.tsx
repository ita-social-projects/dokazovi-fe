import React, { useEffect, useRef, useState } from 'react';
import { isEmpty, uniq } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  FilterTypeEnum,
  IDirection,
  IRegion,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
} from '../../../lib/types';
import { fetchExperts, selectExperts } from '../../../../models/experts';
import { RootStateType } from '../../../store/rootReducer';
import { ExpertsList } from '../../../lib/components/Experts/ExpertsList';
import { useEffectExceptOnMount } from '../../../lib/hooks/useEffectExceptOnMount';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';

import { selectExpertsByIds } from '../../../store/selectors';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { useQuery } from '../../../lib/hooks/useQuery';
import { CheckboxDropdownFilterForm } from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { useActions } from '../../../../shared/hooks';
import { LOAD_EXPERTS_LIMIT } from '../../../lib/constants/experts';
import { selectLoadingExperts } from '../../../../models/experts/selectors';

const ExpertsView: React.FC = () => {
  const {
    data: {
      expertIds,
      meta: { totalPages, pageNumber, totalElements, isLastPage },
    },
  } = useSelector(selectExperts);
  const loading = useSelector(selectLoadingExperts);

  const [page, setPage] = useState(pageNumber);
  const previous = usePrevious({ page });
  const query = useQuery();
  const history = useHistory();

  const experts = selectExpertsByIds(expertIds);

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const propertiesLoaded = !isEmpty(regions) && !isEmpty(directions);

  const [boundFetchExperts] = useActions([fetchExperts]);

  const fetchData = (appendExperts = false) => {
    const regionsQuery = query.get(QueryTypeEnum.REGIONS);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);
    const filters = {
      page,
      regions: mapQueryIdsStringToArray(regionsQuery),
      directions: mapQueryIdsStringToArray(directionsQuery),
      appendExperts,
    };
    boundFetchExperts(filters, appendExperts);
  };

  const setFilters = (
    checked: CheckboxFormStateType,
    filterType: FilterTypeEnum,
  ) => {
    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    setPage(0);

    history.push({
      search: query.toString(),
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const appendExperts = previous && previous.page < page;
    if (
      !isLastPage &&
      Math.ceil(experts.length / LOAD_EXPERTS_LIMIT) !== page + 1
    )
      fetchData(appendExperts);
  }, [
    page,
    query.get(QueryTypeEnum.REGIONS),
    query.get(QueryTypeEnum.DIRECTIONS),
  ]);

  const selectedRegionsString = query.get(QueryTypeEnum.REGIONS)?.split(',');
  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedRegions: IRegion[] | undefined = regions?.filter((region) =>
    selectedRegionsString?.includes(region.id.toString()),
  );
  let selectedDirections:
    | IDirection[]
    | undefined = directions?.filter((direction) =>
    selectedDirectionsString?.includes(direction.id.toString()),
  );

  selectedRegions = !isEmpty(selectedRegions) ? selectedRegions : undefined;
  selectedDirections = !isEmpty(selectedDirections)
    ? selectedDirections
    : undefined;

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [expertIds]);

  return (
    <>
      <PageTitle title="Автори" />

      {propertiesLoaded && (
        <Grid container direction="column">
          <CheckboxDropdownFilterForm
            onFormChange={(checked) =>
              setFilters(checked, FilterTypeEnum.REGIONS)
            }
            possibleFilters={regions}
            selectedFilters={selectedRegions}
            filterTitle="Регіони: "
          />
          <CheckboxDropdownFilterForm
            onFormChange={(checked) =>
              setFilters(checked, FilterTypeEnum.DIRECTIONS)
            }
            possibleFilters={directions}
            selectedFilters={selectedDirections}
            filterTitle="Напрямки: "
          />
        </Grid>
      )}
      <>
        {page === 0 && loading === LoadingStatusEnum.pending ? (
          <LoadingContainer loading={loading} expand />
        ) : (
          <>
            <Grid container xs={9}>
              <ExpertsList experts={experts} />
              <Grid container justify="center" ref={gridRef}>
                <LoadMoreButton
                  clicked={loadMore}
                  isLastPage={isLastPage}
                  loading={loading}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  pageNumber={pageNumber}
                  textType={LoadMoreButtonTextType.EXPERT}
                />
              </Grid>
            </Grid>
          </>
        )}
      </>
    </>
  );
};

export default ExpertsView;
