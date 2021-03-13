import { Box, Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import BorderBottom from '../../../lib/components/Border';
import CheckboxFilterForm, {
  ICheckboxFormState,
} from '../../../lib/components/Filters/CheckboxFilterForm';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';
import LoadingInfo from '../../../lib/components/Loading/LoadingInfo';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/Posts/PostsList';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import {
  FilterTypeEnum,
  IPostType,
  LoadingStatusEnum,
  QueryTypeEnum,
} from '../../../lib/types';
import { RequestParamsType } from '../../../lib/utilities/API/types';
import { getQueryTypeByFilterType } from '../../../lib/utilities/filters';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import {
  fetchExpertMaterials,
  setupExpertMaterialsID,
} from '../store/expertsSlice';

export interface IExpertMaterialsContainerProps {
  expertId: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
}) => {
  const dispatch = useDispatch();
  // TODO: fix loading without useEffect
  dispatch(setupExpertMaterialsID(expertId));

  const gridRef = useRef<HTMLDivElement>(null);
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState<number>(0);
  const previous = usePrevious({ page });
  const expertData = useSelector(
    (state: RootStateType) => state.experts.materials[expertId],
  );
  const {
    postIds,
    meta: { loading, isLastPage },
  } = expertData;

  const materials = selectPostsByIds(postIds);
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

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

  const fetchData = (loadMore?: boolean) => {
    const types: number[] | undefined = query
      .get(QueryTypeEnum.POST_TYPES)
      ?.split(',')
      .map(Number);

    const filters: RequestParamsType = {
      page,
      type: types,
    };

    dispatch(fetchExpertMaterials(Number(expertId), filters, loadMore));
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const isLoadMore = previous && previous.page < page;
    fetchData(isLoadMore);
  }, [expertId, query.get(QueryTypeEnum.POST_TYPES), page]);

  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

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
          onFormChange={setFilters}
          possibleFilters={postTypes}
          selectedFilters={selectedPostTypes}
          filterType={FilterTypeEnum.POST_TYPES}
        />
      )}
      <Grid container direction="row" alignItems="center">
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

export default ExpertMaterialsContainer;
