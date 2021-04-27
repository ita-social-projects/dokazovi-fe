import { Grid } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckboxFilterForm, {
  CheckboxFormStateType,
} from '../../../lib/components/Filters/CheckboxFilterForm';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import LoadMoreButton from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import {
  FilterTypeEnum,
  IDirection,
  IPostType,
  LoadingStatusEnum,
  QueryTypeEnum,
  LoadMoreButtonTextType,
} from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import { fetchMaterials } from '../../../store/materials/materialsSlice';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { useQuery } from '../../../lib/hooks/useQuery';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';

const MaterialsView: React.FC = () => {
  const [page, setPage] = useState(0);
  const previous = usePrevious({ page });
  const history = useHistory();
  const query = useQuery();

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector((state: RootStateType) => state.materials);
  const materials = selectPostsByIds(postIds);

  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );
  const propertiesLoaded = !isEmpty(postTypes) && !isEmpty(directions);

  const dispatch = useDispatch();

  const fetchData = (appendPosts = false) => {
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);

    const filters = {
      page,
      postTypes: mapQueryIdsStringToArray(postTypesQuery),
      directions: mapQueryIdsStringToArray(directionsQuery),
    };

    dispatch(fetchMaterials(filters, page, appendPosts));
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
    fetchData(appendPosts);
  }, [
    page,
    query.get(QueryTypeEnum.POST_TYPES),
    query.get(QueryTypeEnum.DIRECTIONS),
  ]);

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

      {propertiesLoaded && (
        <Grid container direction="column">
          <CheckboxFilterForm
            onFormChange={(checked) =>
              setFilters(checked, FilterTypeEnum.POST_TYPES)
            }
            possibleFilters={postTypes}
            selectedFilters={selectedPostTypes}
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
    </>
  );
};

export default MaterialsView;
