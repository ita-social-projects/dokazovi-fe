import { Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import {
  FilterTypeEnum,
  IDirection,
  IOrigin,
  IPostType,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
} from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
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
import { store } from '../../../store/store';

const MaterialsView: React.FC = () => {
  const {
    loading,
    data: {
      postIds,
      meta: { isLastPage, pageNumber, totalElements, totalPages },
    },
  } = useSelector(selectMaterials);

  const [page, setPage] = useState(pageNumber);
  const previous = usePrevious({ page });
  const history = useHistory();
  const query = useQuery();

  const materials = selectPostsByIds(postIds);

  const origins: IOrigin[] = useSelector(
    (state: RootStateType) => state.properties.origins,
  );
  console.log('useSelector', origins);

  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

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

  let selectedOrigins: IOrigin[] | undefined = origins?.filter((direction) =>
    selectedOriginsString?.includes(direction.id.toString()),
  );
  selectedOrigins = !isEmpty(selectedOrigins) ? selectedOrigins : undefined;

  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedDirections:
    | IDirection[]
    | undefined = directions?.filter((direction) =>
    selectedDirectionsString?.includes(direction.id.toString()),
  );

  selectedDirections = !isEmpty(selectedDirections)
    ? selectedDirections
    : undefined;

  const selectedPostTypesString = query
    .get(QueryTypeEnum.POST_TYPES)
    ?.split(',');

  let selectedPostTypes: IPostType[] | undefined = postTypes?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );

  selectedPostTypes = !isEmpty(selectedPostTypes)
    ? selectedPostTypes
    : undefined;

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [postIds]);

  return (
    <>
      <PageTitle title="Матеріали" />
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          <Typography
            variant="h1"
            style={{
              width: '100%',
              fontSize: '28px',
              lineHeight: '28px',
              fontWeight: 'bold',
              margin: '0 0 28px 15px',
            }}
          >
            Вибрано матеріали:
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={9}>
          Chips...
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
                possibleFilters={origins}
                selectedFilters={selectedOrigins}
                filterTitle="за джерелом"
                allTitle="Всі джерела"
              />
              <CheckboxLeftsideFilterForm
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.POST_TYPES)
                }
                possibleFilters={postTypes}
                selectedFilters={selectedPostTypes}
                filterTitle="за типом"
                allTitle="Всі типи"
              />
              <CheckboxLeftsideFilterForm
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.DIRECTIONS)
                }
                possibleFilters={directions}
                selectedFilters={selectedDirections}
                filterTitle="за темою"
                allTitle="Всі теми"
              />
            </>
          )}
        </Grid>
        <Grid item container xs={9} direction="column">
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={loading} expand />
          ) : (
            <>
              <Grid container alignItems="center" style={{ marginTop: 20 }}>
                <PostsList postsList={materials} />
              </Grid>
              <Grid container justify="center" ref={gridRef}>
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
