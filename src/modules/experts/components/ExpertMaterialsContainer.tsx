import { Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckboxFilterForm, {
  CheckboxFormStateType,
} from '../../../lib/components/Filters/CheckboxFilterForm';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/Posts/PostsList';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import { useQuery } from '../../../lib/hooks/useQuery';
import {
  FilterTypeEnum,
  IPostType,
  LoadingStatusEnum,
  QueryTypeEnum,
} from '../../../lib/types';
import { RequestParamsType } from '../../../lib/utilities/API/types';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import { fetchExpertMaterials, resetMaterials } from '../store/expertsSlice';

export interface IExpertMaterialsContainerProps {
  expertId: number;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
}) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const previous = usePrevious({ page });

  useEffect(() => {
    const reset = () => {
      dispatch(resetMaterials());
    };
    reset();
  }, [expertId]);

  const expertData = useSelector(
    (state: RootStateType) => state.experts.materials,
  );
  const {
    postIds,
    meta: { loading, isLastPage, pageNumber, totalElements, totalPages },
  } = expertData;

  const materials = selectPostsByIds(postIds);
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

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

  const fetchData = (appendPosts = false) => {
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES);

    const filters: RequestParamsType = {
      page,
      type: mapQueryIdsStringToArray(postTypesQuery),
    };

    dispatch(fetchExpertMaterials(expertId, filters, appendPosts));
  };

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [query.get(QueryTypeEnum.POST_TYPES), page]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [postIds]);

  const selectedPostTypesString = query
    .get(QueryTypeEnum.POST_TYPES)
    ?.split(',');
  let selectedPostTypes: IPostType[] | undefined = postTypes?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );
  selectedPostTypes = !isEmpty(selectedPostTypes)
    ? selectedPostTypes
    : undefined;

  return (
    <>
      <Typography variant="h4">Матеріали</Typography>
      {!isEmpty(postTypes) && (
        <CheckboxFilterForm
          onFormChange={(checked) =>
            setFilters(checked, FilterTypeEnum.POST_TYPES)
          }
          possibleFilters={postTypes}
          selectedFilters={selectedPostTypes}
        />
      )}
      {page === 0 && loading === LoadingStatusEnum.pending ? (
        <LoadingContainer loading={loading} expand />
      ) : (
        <>
          <Grid container>
            <PostsList postsList={materials} />
          </Grid>
          <LoadingContainer loading={loading} />
          <Grid container direction="column" alignItems="center" ref={gridRef}>
            <LoadMorePostsButton
              clicked={loadMore}
              isLastPage={isLastPage}
              loading={loading}
              totalPages={totalPages}
              totalElements={totalElements}
              pageNumber={pageNumber}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default ExpertMaterialsContainer;
