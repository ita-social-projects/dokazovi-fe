import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostView from '../../posts/components/PostView';
import { RootStateType } from '../../../store/rootReducer';
import { IPost, PostTypeEnum } from '../../../lib/types';
import usePostPreviewData from '../../../lib/hooks/usePostPreviewData';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';

export interface ILocationState {
  postType: string;
  publishPost: CreatePostRequestType;
}

const PostCreationPreview: React.FC = () => {
  const history = useHistory<ILocationState>();

  const currentState: ILocationState = history.location.state;

  const { htmlContent, preview, title, directions } = useSelector(
    (state: RootStateType) =>
      state.newPostDraft[currentState.postType as PostTypeEnum],
  );

  const getUserData = usePostPreviewData();

  const post = {
    ...getUserData,
    content: htmlContent,
    preview: preview.value,
    title,
    directions,
  } as IPost;

  const goBackToCreation = () => {
    history.goBack();
  };

  const sendPost = async () => {
    const responsePost = await createPost(currentState.publishPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  return (
    <>
      <PageTitle title="Попередній перегляд" />
      <PostView post={post} />
      <PostCreationButtons
        publishPost={sendPost}
        goPreview={goBackToCreation}
        isOnPreview
      />
    </>
  );
};

export default PostCreationPreview;
