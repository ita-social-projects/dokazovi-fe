import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../../lib/hooks/useActions';
import { RootStateType } from '../../../store/rootReducer';
import { fetchNewestPosts } from '../store/mainSlice';
import { useStyles } from '../styles/NewestContainer.style';
import PostsList from '../../../lib/components/Posts/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import { selectPostsByIds } from '../../../store/selectors';
import LoadingContainer from '../../../lib/components/Loading/LoadingContainer';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const {
    newestPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.newest);
  const newestPosts = selectPostsByIds(newestPostIds);

  const actionFetchNewestPosts = useActions(fetchNewestPosts);

  useEffect(() => {
    actionFetchNewestPosts();
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
