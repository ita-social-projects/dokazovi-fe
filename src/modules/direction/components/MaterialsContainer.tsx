import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import { fetchMaterials, setPostFilters } from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import {
  FilterTypeEnum,
  IDirection,
  LoadingStatusEnum,
} from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { PostTypeFilter } from './PostTypesFilter';
import { PostTagsFilter } from './PostTagsFilter';
import { selectPostsByIds } from '../../../store/selectors';

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
    // TODO: handle a case when page is > 1 on component's first mount
    // add paginaton?
    dispatchFetchAction();

    return () => {
      history.replace({
        search: '',
      });
    };
  }, []);

  // don't clear query params when returning to previous filter in url
  useEffectExceptOnMount(() => {
    history.replace({
      search: '',
    });
  }, [direction]);

  const setFilters = (checked: string[] = []) => {
    // setFilters is called twice - first a handler is called on click event,
    // then useEffect is called when selected filters change.
    // TODO: prevent double push of params to history on single filter change.
    query.set('types', checked.join(','));
    query.delete('page');
    if (checked.length === 0) query.delete('types');

    history.push({
      search: query.toString(),
    });

    // use a boolean to indicate an initial load (clear all saved ids)
    // if true, replace current ids. if false, concat
    dispatchFetchAction(0, checked, true);
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
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.showMore}
        ref={gridRef}
      >
        {loading !== LoadingStatusEnum.pending && !isLastPage && (
          <Button variant="contained" onClick={fetchMorePosts}>
            Більше матеріалів
          </Button>
        )}
        {isLastPage && <span>Більше нових матеріалів немає</span>}
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
