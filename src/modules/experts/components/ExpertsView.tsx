import React, { useEffect } from 'react';
import { isEmpty, uniq } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { fetchExperts, setExpertsPage } from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import ExpertsList from '../../../lib/components/Experts/ExpertsList';
import {
  FilterTypeEnum,
  IDirection,
  IRegion,
  LoadingStatusEnum,
  QueryTypeEnum,
} from '../../../lib/types';
import { selectExpertsByIds } from '../../../store/selectors';
import { ICheckboxFormState } from '../../../lib/components/Filters/CheckboxFilterForm';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';
import { useQuery } from '../../../lib/hooks/useQuery';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';

const ExpertsView: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    expertIds,
    meta: { totalPages, pageNumber, loading },
  } = useSelector((state: RootStateType) => state.experts.experts);

  const experts = selectExpertsByIds(expertIds);

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const propertiesLoaded = !isEmpty(regions) && !isEmpty(directions);

  const fetchData = () => {
    const pageQuery = Number(query.get(QueryTypeEnum.PAGE));
    const regionsQuery = query.get(QueryTypeEnum.REGIONS);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);

    const page = pageQuery ? pageQuery - 1 : 0;
    const selectedRegions = mapQueryIdsStringToArray(regionsQuery);
    const selectedDirections = mapQueryIdsStringToArray(directionsQuery);

    dispatch(setExpertsPage(page));
    dispatch(
      fetchExperts({
        page,
        regions: selectedRegions,
        directions: selectedDirections,
      }),
    );
  };

  const setFilters = (
    checked: ICheckboxFormState,
    filterType: FilterTypeEnum,
  ) => {
    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    query.set(QueryTypeEnum.PAGE, '1');

    history.push({
      search: query.toString(),
    });
  };

  const handlePageChange = (_, newPage: number) => {
    query.set(QueryTypeEnum.PAGE, newPage.toString());
    history.push({
      search: query.toString(),
    });
  };

  useEffect(() => {
    fetchData();
  }, [
    query.get(QueryTypeEnum.PAGE),
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
        {loading === LoadingStatusEnum.pending ? (
          <LoadingContainer loading={loading} expand />
        ) : (
          <>
            <Grid container spacing={4} style={{ marginTop: 20 }}>
              <ExpertsList experts={experts} />
            </Grid>
            <Box mt={2} mb={2}>
              <Grid container direction="column" alignItems="center">
                <Pagination
                  count={totalPages}
                  page={pageNumber + 1}
                  showFirstButton
                  showLastButton
                  onChange={handlePageChange}
                />
              </Grid>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default ExpertsView;
