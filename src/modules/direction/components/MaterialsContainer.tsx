import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import { fetchMaterials, setPostFilters } from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { FilterTypeEnum, IDirection } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { PostTypeFilter } from './PostTypesFilter';
import { PostTagsFilter } from './PostTagsFilter';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
  } = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );
  const materials = selectPostsByIds(postIds);

  const dispatch = useDispatch();

  const dispatchFetchAction = (
    page = Number(query.get('page')),
    checked = query.get('types')?.split(','),
    replacePosts = false,
  ) => {
    dispatch(fetchMaterials(direction, checked, page, replacePosts));
  };

  const fetchMorePosts = () => {
    const nextPage = Number(query.get('page')) + 1;
    query.set('page', String(nextPage));
    history.push(`${location.pathname}?${query.toString()}`);

    dispatchFetchAction(nextPage);
  };

  useEffect(() => {
    dispatchFetchAction();

    return () => {
      history.replace({
        search: '',
      });
    };
  }, []);

  useEffectExceptOnMount(() => {
    // page and types values are initialized from current query.
    // this call will replace current post ids with fetched ones.
    dispatchFetchAction(undefined, undefined, true);
  }, [query.get('types')]);

  // don't clear query params when returning to previous filter in url from
  // another view.
  useEffectExceptOnMount(() => {
    history.replace({
      search: '',
    });
  }, [direction]);

  const setFilters = (checked: string[] = []) => {
    query.set('types', checked.join(','));
    query.delete('page');
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
          directionName: direction.name,
        }),
      );
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4">Матеріали</Typography>
      <PostTypeFilter
        setFilters={setFilters}
        selectedTypes={query.get('types')?.split(',')}
      />
      <PostTagsFilter directionName={direction.name} />
      <Grid container spacing={2} direction="row" alignItems="center">
        <PostList postsList={materials} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.loading}
      >
        <LoadingInfo loading={loading} />
      </Grid>
      <Grid container direction="column" alignItems="center" ref={gridRef}>
        <LoadMorePostsButton
          clicked={fetchMorePosts}
          isLastPage={isLastPage}
          loading={loading}
        />
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
