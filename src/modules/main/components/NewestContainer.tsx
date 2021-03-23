import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '../../../store/rootReducer';
import { fetchNewestPosts } from '../store/mainSlice';
import { useStyles } from '../styles/NewestContainer.style';
import PostsList from '../../../lib/components/Posts/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import { selectPostsByIds } from '../../../store/selectors';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';

const NewestContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    newestPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.newest);
  const newestPosts = selectPostsByIds(newestPostIds);

  useEffect(() => {
    const setNewestPosts = () => dispatch(fetchNewestPosts());
    setNewestPosts();
  }, []);

  return (
    <div className={classes.container}>
      {loading === LoadingStatusEnum.pending ? (
        <LoadingContainer loading={loading} expand />
      ) : (
        <>
          <PostsList postsList={newestPosts} />
          <LoadingContainer loading={loading} />
        </>
      )}
    </div>
  );
};

export default NewestContainer;
