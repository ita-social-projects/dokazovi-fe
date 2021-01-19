import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import PostView from './PostView';

const PostViewContainer: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [loadedPost, setLoadedPost] = useState<IPost>();

  const fetchPost = useCallback(async () => {
    const postResponse = await getPostById(Number(postId));
    setLoadedPost(postResponse.data);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return <>{loadedPost && <PostView post={loadedPost} />}</>;
};

export default PostViewContainer;
