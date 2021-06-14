import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import {
  getPostById,
  getUniquePostViewsCounter,
} from '../../../lib/utilities/API/api';
import {
  IPost,
  LoadingStatusEnum,
  LoadingStatusType,
} from '../../../lib/types';
import PostView from './PostView';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { setGALocation } from '../../../../utilities/setGALocation';
import { ERROR_404 } from '../../../lib/constants/routes';

const PostViewWrapper: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );
  const [loadedPost, setLoadedPost] = useState<IPost>();
  const [statusCode, setStatusCode] = useState<number>();

  const handlePostDeletion = () => {
    if (!loadedPost) return;
    try {
      const response = 1; // Mock by status 1 =  success

      if (response === 1) {
        toast.success(
          `Видалення матеріалу "${loadedPost.title}" пройшло успішно!`,
        );
        history.go(-1);
      }
    } catch (e) {
      toast.success(`Видалити матеріал "${loadedPost.title}" не вдалося.`);
    }
  };

  useEffect(() => {
    setGALocation(window);
  }, []);

  useEffect(() => {
    getPostById(Number(postId))
      .then((postResponse) => {
        const { content } = postResponse.data;
        const sanitizedData = {
          ...postResponse.data,
          content: sanitizeHtml(content),
        };
        setLoadedPost((post) => {
          return { ...post, ...sanitizedData } as IPost;
        });
        setLoadingStatus(LoadingStatusEnum.succeeded);
      })
      .catch(() => {
        setStatusCode(404);
      });
  }, []);

  useEffect(() => {
    getUniquePostViewsCounter(Number(postId))
      .then((res) => {
        const uniqueViewsCounter = res.data;
        setLoadedPost((post) => {
          return { ...post, uniqueViewsCounter } as IPost;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (statusCode === 404) {
    history.push(ERROR_404);
  }

  return (
    <>
      {loadedPost && loadingStatus === LoadingStatusEnum.succeeded && (
        <>
          <PageTitle title={loadedPost.title} />

          <PostView
            post={loadedPost}
            modificationAllowed
            onDelete={handlePostDeletion}
          />
        </>
      )}
    </>
  );
};

export default PostViewWrapper;
