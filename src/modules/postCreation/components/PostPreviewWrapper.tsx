import React from 'react';
import { useHistory } from 'react-router-dom';
import PostView from '../../posts/components/PostView';
import { IPost } from '../../../lib/types';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import {
  CreatePostRequestUnionType,
  UpdatePostRequestUnionType,
} from '../../../lib/utilities/API/types';
import { createPost, updatePost } from '../../../lib/utilities/API/api';

type ActionDataType =
  | { actionType: 'create'; postToSend: CreatePostRequestUnionType }
  | { actionType: 'update'; postToSend: UpdatePostRequestUnionType };

export type PostPreviewLocationStateType = ActionDataType & {
  previewPost: IPost;
};

const PostPreviewWrapper: React.FC = () => {
  const history = useHistory<PostPreviewLocationStateType>();
  const data = history.location.state;

  if (!data) {
    history.push('/');
  }

  const onPublish = async () => {
    const response = await (data.actionType === 'update'
      ? updatePost(data.postToSend)
      : createPost(data.postToSend));
    history.push(`/posts/${response.data.id}`);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <PageTitle title="Попередній перегляд" />
      <PostView post={data.previewPost} />
      <PostCreationButtons
        publishPost={onPublish}
        goPreview={goBack}
        isOnPreview
      />
    </>
  );
};

export default PostPreviewWrapper;
