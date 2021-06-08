import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { ArticleUpdation } from './ArticleUpdation';
import { NoteUpdation } from './NoteUpdation';
import VideoUpdation from './VideoUpdation';
import { useQuery } from '../../../lib/hooks/useQuery';
import { setGALocation } from '../../../../utilities/setGALocation';
import { ERROR_404 } from '../../../lib/constants/errors';

const PostUpdationWrapper: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const [loadedPost, setLoadedPost] = useState<IPost>();
  const [statusCode, setStatusCode] = useState<number>();

  const postId = query.get('id');

  const fetchPost = useCallback(async () => {
    try {
      const id = Number(postId);
      if (!Number.isInteger(id)) {
        throw new Error();
      }
      const postResponse = await getPostById(id);
      const { content } = postResponse.data;
      const sanitizedPost = {
        ...postResponse.data,
        content: sanitizeHtml(content),
      };
      setLoadedPost(sanitizedPost);
    } catch (error) {
      setStatusCode(404);
    }
  }, [postId]);

  useEffect(() => {
    setGALocation(window);
  }, []);

  useEffect(() => {
    fetchPost();
  }, []);

  if (statusCode === 404) {
    history.push(ERROR_404);
  }

  return (
    <>
      {loadedPost && loadedPost.type.id === 1 && (
        <ArticleUpdation post={loadedPost} />
      )}
      {loadedPost && loadedPost.type.id === 3 && (
        <NoteUpdation post={loadedPost} />
      )}
      {loadedPost && loadedPost.type.id === 2 && (
        <VideoUpdation post={loadedPost} />
      )}
    </>
  );
};

export default PostUpdationWrapper;
