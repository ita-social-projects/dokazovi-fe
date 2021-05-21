import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../../../shared/hooks/useActions';
import { useStyles } from '../styles/MainExpertsView.styles';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import {
  fetchNewestPosts,
  selectLoadingMain,
  selectNewestPosts,
} from '../../../../models/main';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const { newestPostIds, newestPosts: posts } = useSelector(selectNewestPosts);
  const loading = useSelector(selectLoadingMain);
  // const newestPosts = selectPostsByIds(newestPostIds);
  const newestPosts = Object.values(posts);

  const [boundFetchNewestPosts] = useActions([fetchNewestPosts]);

  useEffect(() => {
    boundFetchNewestPosts();
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
