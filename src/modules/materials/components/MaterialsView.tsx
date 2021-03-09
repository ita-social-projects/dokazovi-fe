import { Grid } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CheckBoxFilterForm, {
  ICheckBoxFormState,
} from '../../../lib/components/CheckBoxFilterForm';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import PostsList from '../../../lib/components/PostsList';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { FilterTypeEnum, LoadingStatusEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { selectPostsByIds } from '../../../store/selectors';
import { fetchMaterials, setPostFilters } from '../store/materialsSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TYPES_QUERY = 'types';

const MaterialsView: React.FC = () => {
  const history = useHistory();
  const query = useQuery();

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
    filters,
  } = useSelector((state: RootStateType) => state.materials);
  const materials = selectPostsByIds(postIds);

  const dispatch = useDispatch();

  const dispatchFetchAction = (checked = query.get('types')?.split(',')) => {
    dispatch(fetchMaterials(null, checked));
  };

  const fetchMorePosts = () => {
    dispatchFetchAction();
  };

  useEffect(() => {
    dispatchFetchAction();

    return () => {
      history.replace({
        search: '',
      });
    };
  }, [history]);

  useEffectExceptOnMount(() => {
    // page and types values are initialized from current query.
    // this call will replace current post ids with fetched ones.
    dispatchFetchAction(undefined);
  }, [query.get('types'), filters]);

  const setFilters = (checked: string[] = []) => {
    query.set('types', checked.join(','));
    if (checked.length === 0) query.delete('types');

    history.push({
      search: query.toString(),
    });
  };

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  useEffect(() => {
    return () => {
      dispatch(
        setPostFilters({
          key: FilterTypeEnum.TAGS,
          filters: {
            value: [],
          },
        }),
      );
    };
  }, []);

  return (
    <>
      {/* <CheckBoxFilterForm
        onFormChange={setFilters}
        possibleFilters={postTypes}
        selectedFilters={selectedFilters}
      /> */}
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
          clicked={fetchMorePosts}
          isLastPage={isLastPage}
          loading={loading}
        />
      </Grid>
    </>
  );
};

export default MaterialsView;
