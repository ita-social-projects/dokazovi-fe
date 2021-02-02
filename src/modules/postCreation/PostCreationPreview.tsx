import React from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostView from '../posts/components/PostView';
import { RootStateType } from '../../store/rootReducer';
import { IPost, PostTypeEnum } from '../../lib/types';
import { useStyles } from './styles/PostCreationPreview.styles';
import { mockPost } from '../posts/mockPost/mockPost';
import PostCreationButtons from '../../lib/components/PostCreationButtons/PostCreationButtons';

export interface ILocationState {
  postType: string;
  publishPost: () => void;
}

const PostCreationPreview: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const currentState = history.location.state as ILocationState;

  const draft = useSelector(
    (state: RootStateType) =>
      state.newPostDraft[currentState.postType as PostTypeEnum],
  );

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const directionIds = Object.keys(draft.topics).filter(
    (id) => draft.topics[id],
  );

  const directions = allDirections.filter((direction) =>
    directionIds.includes(direction.id.toString()),
  );

  const post = {
    ...mockPost,
    content: draft.htmlContent,
    preview: draft.preview.value,
    title: draft.title,
    directions,
    createdAt: new Date().toLocaleDateString(),
  } as IPost;

  const goBackToCreation = () => {
    history.goBack();
  };

  return (
    <Container className={classes.root}>
      <PostView post={post} />
      <PostCreationButtons
        publishPost={currentState.publishPost}
        goPreview={goBackToCreation}
        isOnPreview
      />
    </Container>
  );
};

export default PostCreationPreview;
