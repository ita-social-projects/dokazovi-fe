import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import PostView from './PostView';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';

const PostViewWrapper: React.FC = () => {
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

  const deletePost = useCallback(() => {
    console.log('hello');
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (statusCode === 404) {
    history.push('/error_404');
  }

  return (
    <>
      {loadedPost && <PostView post={loadedPost} deleteHandler={deletePost} />}
    </>
  );
};

export default PostViewWrapper;
