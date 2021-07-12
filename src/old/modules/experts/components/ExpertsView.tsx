import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty, uniq } from 'lodash';
import { Grid, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  ChipFilterEnum,
  ChipFilterType,
  FilterTypeEnum,
  IDirection,
  IRegion,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  filtersStateEnum,
} from '../../../lib/types';
import {
  fetchExperts,
  selectExperts,
  selectExpertsLoading,
} from '../../../../models/experts';
import { RootStateType } from '../../../../models/rootReducer';
import { ExpertsList } from '../../../lib/components/Experts/ExpertsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { selectExpertsByIds } from '../../../../models/helpers/selectors';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { useQuery } from '../../../lib/hooks/useQuery';
import { CheckboxLeftsideFilterForm } from '../../../lib/components/Filters/CheckboxLeftsideFilterForm';
import { LOAD_EXPERTS_LIMIT } from '../../../lib/constants/experts';
import { useActions } from '../../../../shared/hooks';
import { ChipsList } from '../../../../components/Chips/ChipsList/ChipsList';
import { useStyles } from '../styles/ExpertsView.styles';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';
import { updateDir, updateReg } from '../../utilities/utilityFunctions';

const ExpertsView: React.FC = () => {
  const { t } = useTranslation();
  const {
    data: {
      expertIds,
      meta: { totalPages, pageNumber, totalElements, isLastPage },
    },
  } = useSelector(selectExperts);
  const loading = useSelector(selectExpertsLoading);

  const [page, setPage] = useState(pageNumber);
  const [checkedFiltersDirections, setCheckedFiltersDirections] = useState<
    CheckboxFormStateType
  >();
  const [checkedFiltersRegions, setCheckedFiltersRegions] = useState<
    CheckboxFormStateType
  >();

  const previous = usePrevious({ page });
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();

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
    disabled?: CheckboxFormStateType,
  ) => {
    if (filterType === 1) {
      setCheckedFiltersDirections(checked);
    } else if (filterType === 2) {
      if (disabled) {
        setCheckedFiltersRegions(disabled);
      } else {
        setCheckedFiltersRegions(checked);
      }
    }
    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    setPage(0);

    if (isQuerySame && uniq(Object.values(checked))[0] === false) {
      query.set(queryType, '0');
      history.push({
        search: query.toString(),
      });
    } else {
      history.push({
        search: query.toString(),
      });
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setGALocation(window);
  }, []);

  useEffect(() => {
    const appendExperts = (previous && previous.page < page) || page !== 0;
    if (
      !isLastPage &&
      Math.ceil(experts.length / LOAD_EXPERTS_LIMIT) !== page + 1
    ) {
      fetchData(appendExperts);
    }
  }, [page]);

  useEffect(() => {
    const appendExperts = (previous && previous.page < page) || page !== 0;
    fetchData(appendExperts);
  }, [query.get(QueryTypeEnum.REGIONS), query.get(QueryTypeEnum.DIRECTIONS)]);

  const selectedRegionsString = query.get(QueryTypeEnum.REGIONS)?.split(',');
  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedRegions: IRegion[] | filtersStateEnum = regions?.filter(
    (region) =>
      selectedRegionsString?.includes(region.id.toString()) &&
      region.usersPresent,
  );
  let selectedDirections:
    | IDirection[]
    | filtersStateEnum = directions?.filter((direction) =>
    selectedDirectionsString?.includes(direction.id.toString()),
  );

  if (isEmpty(selectedRegions)) {
    if (
      selectedRegionsString?.length === 1 &&
      selectedRegionsString?.[0] === '0'
    ) {
      selectedRegions = filtersStateEnum.empty;
    } else {
      selectedRegions = filtersStateEnum.notEmpty;
    }
  }

  if (isEmpty(selectedDirections)) {
    if (
      selectedDirectionsString?.length === 1 &&
      selectedDirectionsString?.[0] === '0'
    ) {
      selectedDirections = filtersStateEnum.empty;
    } else {
      selectedDirections = filtersStateEnum.notEmpty;
    }
  }

  useEffect(() => {
    setCheckedFiltersDirections(updateDir(selectedDirections, directions));
  }, [query.get(QueryTypeEnum.DIRECTIONS)]);

  useEffect(() => {
    setCheckedFiltersRegions(updateReg(selectedRegions, regions));
  }, [query.get(QueryTypeEnum.REGIONS)]);

  const getRegions = () => {
    if (typeof selectedRegions !== 'string') {
      const names = selectedRegions?.reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[]);
      if (names) {
        return names.join(', ');
      }
    }

    return regions
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const getDirections = () => {
    if (typeof selectedDirections !== 'string') {
      const names = selectedDirections?.reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[]);
      if (names) {
        return names.join(', ');
      }
    }

    return directions
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const handleDeleteChip = (
    key: number | undefined,
    chipsListType: ChipFilterType | undefined,
  ) => {
    let filtersUpdatedByChips: undefined | CheckboxFormStateType;

    if (chipsListType === 'DIRECTION') {
      filtersUpdatedByChips = { ...checkedFiltersDirections };
    } else if (chipsListType === 'REGION') {
      filtersUpdatedByChips = { ...checkedFiltersRegions };
    }
    if (filtersUpdatedByChips && key) {
      filtersUpdatedByChips[key] = false;
      if (chipsListType === 'DIRECTION') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.DIRECTIONS);
      } else if (chipsListType === 'REGION') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.REGIONS);
      }
    }
  };

  return (
    <>
      <PageTitle title={t(langTokens.common.experts)} />
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          <Typography className={classes.title} variant="h1">
            {`${t(langTokens.experts.selectedExperts)}:`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={9}>
          <Box className={classes.container}>
            {typeof selectedDirections === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allDirections)}
              </Typography>
            ) : (
              <ChipsList
                checkedNames={getDirections()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.DIRECTION}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            {typeof selectedRegions === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allRegions)}
              </Typography>
            ) : (
              <ChipsList
                checkedNames={getRegions()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.REGION}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            <Typography
              className={classes.totalFilters}
              component="div"
              variant="subtitle2"
              color="textSecondary"
            >
              {totalElements}{' '}
              {t(langTokens.experts.expert, {
                count: totalElements,
              }).toLowerCase()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          {propertiesLoaded && (
            <>
              <CheckboxLeftsideFilterForm
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.DIRECTIONS)
                }
                possibleFilters={directions}
                selectedFilters={selectedDirections}
                filterTitle={t(langTokens.common.byDirection).toLowerCase()}
                allTitle={t(langTokens.common.allDirections)}
                filterType={QueryTypeEnum.DIRECTIONS}
              />
              <CheckboxLeftsideFilterForm
                onFormChange={(checked, disabled) =>
                  setFilters(checked, FilterTypeEnum.REGIONS, disabled)
                }
                possibleFilters={regions}
                selectedFilters={selectedRegions}
                filterTitle={t(langTokens.common.byRegion).toLowerCase()}
                allTitle={t(langTokens.common.allRegions)}
                filterType={QueryTypeEnum.REGIONS}
              />
            </>
          )}
        </Grid>

        <Grid item container xs={9} direction="column">
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={loading} expand />
          ) : (
            <>
              <ExpertsList experts={experts} />
              <Grid container justify="center">
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertsView;
