/* eslint-disable @typescript-eslint/no-shadow */
import { Box, Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import {
  ChipFilterEnum,
  ChipFilterType,
  FilterTypeEnum,
  IDirection,
  IOrigin,
  IPostType,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  filtersStateEnum,
} from '../../../lib/types';
import { selectPostsByIds } from '../../../../models/helpers/selectors';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { useQuery } from '../../../lib/hooks/useQuery';
import { fetchMaterials, selectMaterials } from '../../../../models/materials';
import { useActions } from '../../../../shared/hooks';
import { LOAD_POSTS_LIMIT } from '../../../lib/constants/posts';
import { CheckboxLeftsideFilterForm } from '../../../lib/components/Filters/CheckboxLeftsideFilterForm';
import { ChipsList } from '../../../../components/Chips/ChipsList/ChipsList';
import { useStyles } from '../styles/MaterialsView.styles';
import { setGALocation } from '../../../../utilities/setGALocation';
import {
  selectDirections,
  selectOrigins,
  selectPostTypes,
} from '../../../../models/properties';
import {
  defaultPlural,
  langTokens,
} from '../../../../locales/localizationInit';
import {
  updatePostTypes,
  updateOrig,
  updateDir,
} from '../../utilities/utilityFunctions';

const MaterialsView: React.FC = () => {
  const { t } = useTranslation();
  const {
    loading,
    data: {
      postIds,
      meta: { isLastPage, pageNumber, totalElements, totalPages },
    },
  } = useSelector(selectMaterials);

  const [page, setPage] = useState(pageNumber);

  const [checkedFiltersOrigins, setCheckedFiltersOrigins] = useState<
    CheckboxFormStateType
  >();
  const [checkedFiltersDirections, setCheckedFiltersDirections] = useState<
    CheckboxFormStateType
  >();
  const [checkedFiltersPostTypes, setCheckedFiltersPostTypes] = useState<
    CheckboxFormStateType
  >();
  const previous = usePrevious({ page });
  const history = useHistory();
  const query = useQuery();
  const classes = useStyles();

  const materials = selectPostsByIds(postIds);

  const origins = useSelector(selectOrigins);

  const originsInPlural: IOrigin[] = [];

  if (origins.length) {
    const el1: IOrigin = { ...origins[0] };
    const el2: IOrigin = { ...origins[1] };
    const el3: IOrigin = { ...origins[2] };

    Object.defineProperty(el1, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.experts.expertOpinion, defaultPlural)}`,
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.translation, defaultPlural)}`,
    });

    originsInPlural.push(el1, el2, el3);
  }

  const postTypes = useSelector(selectPostTypes);

  const postTypesInPlural: IPostType[] = [];

  if (postTypes.length) {
    const el1: IPostType = { ...postTypes[0] };
    const el2: IPostType = { ...postTypes[1] };
    const el3: IPostType = { ...postTypes[2] };

    Object.defineProperty(el1, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.article, defaultPlural)}`,
    });
    Object.defineProperty(el2, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.video)}`,
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.post, defaultPlural)}`,
    });

    postTypesInPlural.push(el1, el2, el3);
  }

  const directions = useSelector(selectDirections);

  const propertiesLoaded =
    !isEmpty(postTypes) && !isEmpty(directions) && !isEmpty(origins);

  const [boundFetchMaterials] = useActions([fetchMaterials]);

  const stringOfOrigins = () => {
    let result = '1';
    for (let i = 1; i < origins.length; i += 1) {
      result = `${result},${origins[i].id}`;
    }
    return result;
  };

  const stringOfPostTypes = () => {
    let result = '1';
    for (let i = 1; i < postTypes.length; i += 1) {
      result = `${result},${postTypes[i].id}`;
    }
    return result;
  };

  const stringOfDirections = () => {
    let result = '1';
    for (let i = 1; i < directions.length; i += 1) {
      result = `${result},${directions[i].id}`;
    }
    return result;
  };

  const fetchData = (appendPosts = false) => {
    const originsQuery = query.get(QueryTypeEnum.ORIGINS)
      ? query.get(QueryTypeEnum.ORIGINS)
      : stringOfOrigins();
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES)
      ? query.get(QueryTypeEnum.POST_TYPES)
      : stringOfPostTypes();
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS)
      ? query.get(QueryTypeEnum.DIRECTIONS)
      : stringOfDirections();

    const filters = {
      page,
      origins: mapQueryIdsStringToArray(originsQuery),
      postTypes: mapQueryIdsStringToArray(postTypesQuery),
      directions: mapQueryIdsStringToArray(directionsQuery),
    };

    boundFetchMaterials({ filters, page, appendPosts });
  };

  const setFilters = (
    checked: CheckboxFormStateType,
    filterType: FilterTypeEnum,
  ) => {
    if (filterType === 0) {
      setCheckedFiltersPostTypes(checked);
    } else if (filterType === 1) {
      setCheckedFiltersDirections(checked);
    } else if (filterType === 4) {
      setCheckedFiltersOrigins(checked);
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
    const appendPosts = previous && previous.page < page;
    if (
      !isLastPage &&
      Math.ceil(materials.length / LOAD_POSTS_LIMIT) !== page + 1
    ) {
      fetchData(appendPosts);
    }
  }, [page]);

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [
    query.get(QueryTypeEnum.ORIGINS),
    query.get(QueryTypeEnum.POST_TYPES),
    query.get(QueryTypeEnum.DIRECTIONS),
  ]);

  const selectedOriginsString = query.get(QueryTypeEnum.ORIGINS)?.split(',');

  let selectedOrigins:
    | IOrigin[]
    | filtersStateEnum = originsInPlural?.filter((direction) =>
    selectedOriginsString?.includes(direction.id.toString()),
  );
  if (isEmpty(selectedOrigins)) {
    if (
      selectedOriginsString?.length === 1 &&
      selectedOriginsString?.[0] === '0'
    ) {
      selectedOrigins = filtersStateEnum.empty;
    } else {
      selectedOrigins = filtersStateEnum.notEmpty;
    }
  }

  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedDirections:
    | IDirection[]
    | filtersStateEnum = directions?.filter((direction) =>
    selectedDirectionsString?.includes(direction.id.toString()),
  );

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

  const selectedPostTypesString = query
    .get(QueryTypeEnum.POST_TYPES)
    ?.split(',');

  let selectedPostTypes:
    | IPostType[]
    | filtersStateEnum = postTypesInPlural?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );

  if (isEmpty(selectedPostTypes)) {
    if (
      selectedPostTypesString?.length === 1 &&
      selectedPostTypesString?.[0] === '0'
    ) {
      selectedPostTypes = filtersStateEnum.empty;
    } else {
      selectedPostTypes = filtersStateEnum.notEmpty;
    }
  }

  useEffect(() => {
    setCheckedFiltersOrigins(updateOrig(selectedOrigins, origins));
  }, [query.get(QueryTypeEnum.ORIGINS)]);

  useEffect(() => {
    setCheckedFiltersPostTypes(updatePostTypes(selectedPostTypes, postTypes));
  }, [query.get(QueryTypeEnum.POST_TYPES)]);

  useEffect(() => {
    setCheckedFiltersDirections(updateDir(selectedDirections, directions));
  }, [query.get(QueryTypeEnum.DIRECTIONS)]);

  const getOrigins = () => {
    if (typeof selectedOrigins !== 'string') {
      if (selectedOrigins) {
        const names = selectedOrigins?.reduce((acc, filter) => {
          acc.push(filter.name);
          return acc;
        }, [] as string[]);
        if (names) {
          return names.join(', ');
        }
      }
    }

    return origins
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const getDirections = () => {
    if (typeof selectedDirections !== 'string') {
      if (selectedDirections) {
        const names = selectedDirections?.reduce((acc, filter) => {
          acc.push(filter.name);
          return acc;
        }, [] as string[]);
        if (names) {
          return names.join(', ');
        }
      }
    }

    return directions
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const getPostTypes = () => {
    if (typeof selectedPostTypes !== 'string') {
      if (selectedPostTypes) {
        const names = selectedPostTypes?.reduce((acc, filter) => {
          acc.push(filter.name);
          return acc;
        }, [] as string[]);
        if (names) {
          return names.join(', ');
        }
      }
    }

    return postTypes
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

    if (chipsListType === 'ORIGIN') {
      filtersUpdatedByChips = { ...checkedFiltersOrigins };
    } else if (chipsListType === 'POST_TYPE') {
      filtersUpdatedByChips = { ...checkedFiltersPostTypes };
    } else if (chipsListType === 'DIRECTION') {
      filtersUpdatedByChips = { ...checkedFiltersDirections };
    }
    if (filtersUpdatedByChips && key) {
      filtersUpdatedByChips[key] = false;
      if (chipsListType === 'ORIGIN') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.ORIGINS);
      } else if (chipsListType === 'POST_TYPE') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.POST_TYPES);
      } else if (chipsListType === 'DIRECTION') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.DIRECTIONS);
      }
    }
  };

  return (
    <>
      <PageTitle title={t(langTokens.common.materials)} />
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          <Typography className={classes.title} variant="h1">
            {`${t(langTokens.materials.selectedMaterials)}:`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={9}>
          <Box className={classes.container}>
            {typeof selectedOrigins === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allOrigins)}
              </Typography>
            ) : (
              <ChipsList
                filtersPlural={originsInPlural}
                checkedNames={getOrigins()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.ORIGIN}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            {typeof selectedPostTypes === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allTypes)}
              </Typography>
            ) : (
              <ChipsList
                filtersPlural={postTypesInPlural}
                checkedNames={getPostTypes()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.POST_TYPE}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
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
            <Typography
              className={classes.totalFilters}
              component="div"
              variant="subtitle2"
              color="textSecondary"
            >
              {totalElements}{' '}
              {t(langTokens.materials.material, {
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
                  setFilters(checked, FilterTypeEnum.ORIGINS)
                }
                possibleFilters={originsInPlural}
                selectedFilters={selectedOrigins}
                filterTitle={t(langTokens.common.byOrigin).toLowerCase()}
                allTitle={t(langTokens.common.allOrigins)}
                filterType={QueryTypeEnum.ORIGINS}
              />
              <CheckboxLeftsideFilterForm
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.POST_TYPES)
                }
                possibleFilters={postTypesInPlural}
                selectedFilters={selectedPostTypes}
                filterTitle={t(langTokens.common.byType).toLowerCase()}
                allTitle={t(langTokens.common.allTypes)}
                filterType={QueryTypeEnum.POST_TYPES}
              />
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
            </>
          )}
        </Grid>
        <Grid item container xs={9} direction="column">
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={loading} expand />
          ) : (
            <>
              <PostsList postsList={materials} />
              <Grid container justify="center">
                <LoadMoreButton
                  clicked={loadMore}
                  isLastPage={isLastPage}
                  loading={loading}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  pageNumber={pageNumber}
                  textType={LoadMoreButtonTextType.POST}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MaterialsView;
