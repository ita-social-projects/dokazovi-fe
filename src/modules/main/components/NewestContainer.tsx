import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import {
  fetchNewestPosts,
  IMainState,
  fetchInitialNewestPosts,
} from '../store/mainSlice';
import { styles } from './styles/NewestContainer.style';
import BorderBottom from '../../../lib/components/Border';
import PostsList from '../../../lib/components/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';

const NewestContainer: React.FC = () => {
  const dispatch = useDispatch();
  const setNewest = () => dispatch(fetchNewestPosts());

  const {
    newestPostIds,
    meta: { isLastPage, loading, currentPage },
  } = useSelector<RootStateType, IMainState['newest']>((state) => {
    return state.main.newest;
  });
  const newestPosts = selectPostsByIds(newestPostIds);

  useEffect(() => {
    const setNewestInitial = () => dispatch(fetchInitialNewestPosts());
    setNewestInitial();
  }, [dispatch]);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div style={styles.container}>
      {loading === LoadingStatusEnum.pending && currentPage < 1 ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={styles.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>
      ) : (
        <Container>
          <Typography variant="h4">Найновіше</Typography>
          <PostsList postsList={newestPosts} />

          <Grid container direction="column" alignItems="center">
            <LoadingInfo loading={loading} />
          </Grid>

          <Grid container direction="column" alignItems="center" ref={gridRef}>
            <LoadMorePostsButton
              clicked={setNewest}
              isLastPage={isLastPage}
              loading={loading}
            />
          </Grid>
          <BorderBottom />
        </Container>
      )}
    </div>
  );
};

export default NewestContainer;
