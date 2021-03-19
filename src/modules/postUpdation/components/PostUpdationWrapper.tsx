import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import ArticleUpdation from './ArticleUpdation';

const PostUpdationWrapper: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();
  const [loadedPost, setLoadedPost] = useState<IPost>();
  const [statusCode, setStatusCode] = useState<number>();

  const fetchPost = useCallback(async () => {
    try {
      const postResponse = await getPostById(Number(postId));
      const { content } = postResponse.data;
      const sanitizedData = {
        ...postResponse.data,
        content: sanitizeHtml(content) as string,
      };
      setLoadedPost(sanitizedData);
    } catch (error) {
      setStatusCode(404);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (statusCode === 404) {
    history.push('/error_404');
  }

  return <>{loadedPost && <ArticleUpdation post={loadedPost} />}</>;
};

export default PostUpdationWrapper;
