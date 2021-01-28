import React from 'react';
import { Container, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostView from '../posts/components/PostView';
import { RootStateType } from '../../store/rootReducer';
import { IPost, PostTypeEnum } from '../../lib/types';
import { useStyles } from './styles/PostCreationPreview.styles';
import { mockPost } from '../posts/mockPost/mockPost';

const ArticleCreationPreview: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const currentPostCreation = history.location.pathname.split('/')[1];
  const currentPostType = history.location.state;

  const draft = useSelector(
    (state: RootStateType) =>
      state.newPostDraft[currentPostType as PostTypeEnum],
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
    history.push(`/${currentPostCreation}`);
  };

  return (
    <Container className={classes.root}>
      <PostView post={post} />
      <Box className={classes.buttonHolder}>
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          onClick={goBackToCreation}
        >
          Назад до редагування
        </Button>
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </Container>
  );
};

export default ArticleCreationPreview;
