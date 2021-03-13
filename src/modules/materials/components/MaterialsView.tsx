import { Grid } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CheckboxFilterForm, {
  ICheckboxFormState,
} from '../../../lib/components/Filters/CheckboxFilterForm';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/Posts/PostsList';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/СheckboxDropdownFilterForm';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import {
  FilterTypeEnum,
  IDirection,
  IPostType,
  QueryTypeEnum,
} from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import { fetchMaterials } from '../store/materialsSlice';
import { getQueryTypeByFilterType } from '../../../lib/utilities/filters';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';
import PageTitle from '../../../lib/components/Pages/PageTitle';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MaterialsView: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const previous = usePrevious({ page });
  const history = useHistory();
  const query = useQuery();

  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );
  const propertiesLoaded = !isEmpty(postTypes) && !isEmpty(directions);

  const dispatch = useDispatch();

  const fetchData = (loadMore?: boolean) => {
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);

    const directionsFilterQuery = directionsQuery
      ? directionsQuery.split(',').filter(Number).map(Number)
      : [];
    const typesFilterQuery = postTypesQuery
      ? postTypesQuery.split(',').filter(Number).map(Number)
      : [];

    const filters = {
      page,
      postTypes: typesFilterQuery,
      directions: directionsFilterQuery,
    };

    dispatch(fetchMaterials(filters, loadMore));
  };

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
  } = useSelector((state: RootStateType) => state.materials);
  const materials = selectPostsByIds(postIds);

  useEffect(() => {
    const loadMore = previous && previous.page < page;
    fetchData(loadMore);
  }, [
    page,
    query.get(QueryTypeEnum.POST_TYPES),
    query.get(QueryTypeEnum.DIRECTIONS),
  ]);

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

    setPage(0);

    history.push({
      search: query.toString(),
    });
  };

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

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  return (
    <>
      <PageTitle title="Матеріали" />

      {propertiesLoaded && (
        <Grid container direction="column">
          {!isEmpty(postTypes) && (
            <CheckboxFilterForm
              onFormChange={setFilters}
              possibleFilters={postTypes}
              selectedFilters={selectedPostTypes}
              filterType={FilterTypeEnum.POST_TYPES}
            />
          )}
          <CheckboxDropdownFilterForm
            onFormChange={setFilters}
            possibleFilters={directions}
            selectedFilters={selectedDirections}
            filterTitle="Напрямки: "
            filterType={FilterTypeEnum.DIRECTIONS}
          />
        </Grid>
      )}
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <PostsList postsList={materials} />
      </Grid>
      <LoadingContainer loading={loading} />
      <Grid container direction="column" alignItems="center" ref={gridRef}>
        <LoadMorePostsButton
          clicked={loadMore}
          isLastPage={isLastPage}
          loading={loading}
        />
      </Grid>
    </>
  );
};

export default MaterialsView;
