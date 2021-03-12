import { Grid } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ICheckBoxFormState } from '../../../lib/components/CheckBoxFilterForm';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/PostsList';
import CheckBoxDropdownFilterForm from '../../../lib/components/СheckBoxDropdownFilterForm';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import { FilterTypeEnum, LoadingStatusEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import { PostTypeFilter } from '../../../lib/components/PostTypesFilter';
import { fetchMaterials } from '../store/materialsSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TYPES_QUERY = 'types';
const DIRECTIONS_QUERY = 'directions';

const MaterialsView: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const previous = usePrevious({ page });
  const history = useHistory();
  const query = useQuery();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );

  const dispatch = useDispatch();

  const fetchData = (loadMore?: boolean) => {
    const typesQuery = query.get(TYPES_QUERY);
    const directionsQuery = query.get(DIRECTIONS_QUERY);

    const directionsFilterQuery = directionsQuery
      ? directionsQuery.split(',').filter(Number)
      : [];
    const typesFilterQuery = typesQuery
      ? typesQuery.split(',').filter(Number)
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
  }, [page, query.get(TYPES_QUERY), query.get(DIRECTIONS_QUERY)]);

  const setDirectionFilter = (
    checked: ICheckBoxFormState,
    filterType: FilterTypeEnum,
  ) => {
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const queryType = filterType.toLowerCase();
    const isQuerySame = uniq(Object.values(checked)).length === 1;

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }
    history.push({
      search: query.toString(),
    });
  };

  const selectedDirectionsString = query.get(DIRECTIONS_QUERY)?.split(',');
  const selectedDirectionsFilter = directions?.filter((post) =>
    selectedDirectionsString?.includes(post.id.toString()),
  );
  const initialDirectionsFilter = !isEmpty(selectedDirectionsString)
    ? selectedDirectionsFilter
    : undefined;

  const setTypeFilter = (checked: string[] = []) => {
    query.set(TYPES_QUERY, checked.join(','));
    if (checked.length === 0) query.delete(TYPES_QUERY);

    history.push({
      search: query.toString(),
    });
  };

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
      <Grid container direction="column">
        <PostTypeFilter
          setFilters={setTypeFilter}
          selectedTypes={query.get(TYPES_QUERY)?.split(',')}
        />
        <CheckBoxDropdownFilterForm
          onFormChange={setDirectionFilter}
          possibleFilters={directions}
          selectedFilters={initialDirectionsFilter}
          filterTitle="Напрямки: "
          filterType={FilterTypeEnum.DIRECTIONS}
        />
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <PostsList postsList={materials} />
      </Grid>
      <Grid container direction="column" alignItems="center">
        {loading === LoadingStatusEnum.pending && (
          <LoadingInfo loading={loading} />
        )}
      </Grid>
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
