import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import PostView from './PostView';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';

const PostViewContainer: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [loadedPost, setLoadedPost] = useState<IPost>();

  const fetchPost = useCallback(async () => {
    const postResponse = await getPostById(Number(postId));
    const { content } = postResponse.data;
    const sanitizedData = {
      ...postResponse.data,
      content: sanitizeHtml(content) as string,
    };
    setLoadedPost(sanitizedData);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return <>{loadedPost && <PostView post={loadedPost} />}</>;
};

export default PostViewContainer;
