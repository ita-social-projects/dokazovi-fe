import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import {
  fetchNewestPosts,
  IMainState,
  fetchInitialNewestPosts,
} from '../store/mainSlice';
import { useStyles } from '../styles/NewestContainer.style';
import PostsList from '../../../lib/components/Posts/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/Loading/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';

const NewestContainer: React.FC = () => {
  const classes = useStyles();
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
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className={classes.container}>
      {loading === LoadingStatusEnum.pending && currentPage < 1 ? (
        <LoadingContainer loading={loading} />
      ) : (
        <>
          <Typography variant="h4">Найновіше</Typography>
          <PostsList postsList={newestPosts} />

          <LoadingContainer loading={loading} />

          <Grid container direction="column" alignItems="center" ref={gridRef}>
            <LoadMorePostsButton
              clicked={setNewest}
              isLastPage={isLastPage}
              loading={loading}
            />
          </Grid>
        </>
      )}
    </div>
  );
};

export default NewestContainer;
