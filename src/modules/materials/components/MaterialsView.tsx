import { Grid } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CheckBoxFilterForm, {
  ICheckBoxFormState,
} from '../../../lib/components/CheckBoxFilterForm';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/PostsList';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import usePrevious from '../../../lib/hooks/usePrevious';
import { IPostType, LoadingStatusEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import {
  fetchExpertMaterials,
  setupExpertMaterialsID,
} from '../../experts/store/expertsSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TYPES_QUERY = 'types';

const MaterialsView: React.FC = () => {
  const expertId = '10';

  const dispatch = useDispatch();
  // TODO: fix loading without useEffect
  dispatch(setupExpertMaterialsID(expertId));

  const gridRef = useRef<HTMLDivElement>(null);
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState<number>(0);
  const previous = usePrevious({ page });
  const materialsData = useSelector(
    (state: RootStateType) => state.experts.materials[expertId],
  );
  const {
    postIds,
    meta: { loading, isLastPage },
  } = materialsData;

  const materials = selectPostsByIds(postIds);
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

  const setFilters = (checked: ICheckBoxFormState) => {
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    query.set(TYPES_QUERY, checkedIds.join(','));
    if (!checkedIds.length) query.delete(TYPES_QUERY);
    setPage(0);
    history.push({
      search: query.toString(),
    });
  };

  const fetchMaterials = (loadMore?: boolean) => {
    const filters = {
      page,
      types: query.get(TYPES_QUERY),
    };
    dispatch(fetchExpertMaterials(Number(expertId), filters, loadMore));
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const isLoadMore = previous && previous.page < page;
    fetchMaterials(isLoadMore);
  }, [query.get(TYPES_QUERY), page]);

  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  const selectedTypesString = query.get(TYPES_QUERY)?.split(',');
  let selectedFilters: IPostType[] | undefined = postTypes?.filter((post) =>
    selectedTypesString?.includes(post.id.toString()),
  );
  selectedFilters = !isEmpty(selectedFilters) ? selectedFilters : undefined;

  return (
    <>
      {!isEmpty(postTypes) && (
        <CheckBoxFilterForm
          onFormChange={setFilters}
          possibleFilters={postTypes}
          selectedFilters={selectedFilters}
        />
      )}
      <Grid container direction="row" alignItems="center">
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
