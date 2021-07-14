import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  deletePostById,
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
import { langTokens } from '../../../../locales/localizationInit';

const PostViewWrapper: React.FC = () => {
  const { t } = useTranslation();

  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );
  const [loadedPost, setLoadedPost] = useState<IPost>();
  const [statusCode, setStatusCode] = useState<number>();

  const handlePostDeletion = async () => {
    if (!loadedPost) return;
    try {
      const response = await deletePostById(Number(postId));
      if (response.data.success) {
        toast.success(
          `${t(langTokens.materials.materialDeletedSuccess, {
            material: loadedPost.title,
          })}!`,
        );
        history.go(-1);
      }
    } catch (e) {
      toast.success(
        `${t(langTokens.materials.materialDeletedFail, {
          material: loadedPost.title,
        })}.`,
      );
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
        // eslint-disable-next-line no-console
        console.error(err);
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
