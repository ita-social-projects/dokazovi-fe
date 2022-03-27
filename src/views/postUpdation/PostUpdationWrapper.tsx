import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { langTokens } from 'locales/localizationInit';
import { useTranslation } from 'react-i18next';
import { getPostById } from '../../old/lib/utilities/API/api';
import { IPost } from '../../old/lib/types';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { PostUpdation } from './PostUpdation';
import { useQuery } from '../../old/lib/hooks/useQuery';
import { setGALocation } from '../../utilities/setGALocation';
import { ERROR_404 } from '../../old/lib/constants/routes';
import { selectCurrentUser } from '../../models/user';
import { selectAuthorities } from '../../models/authorities';
import { Notification } from '../../components/Notifications/Notification';

const PostUpdationWrapper: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const user = useSelector(selectCurrentUser);
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  const { t } = useTranslation();

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
      {loadedPost &&
        (user.data?.id === loadedPost?.author.id || isAdmin ? (
          <PostUpdation post={loadedPost} />
        ) : (
          <Notification message={t(langTokens.common.permissionError)} />
        ))}
    </>
  );
};

export default PostUpdationWrapper;
