import React from 'react';
import { Container, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostView from '../posts/components/PostView';
import { RootStateType } from '../../store/rootReducer';
import { IPost } from '../../lib/types';
import { mockPost } from '../posts/mockPost/mockPost';

const ArticleCreationPreview: React.FC = () => {
  const history = useHistory();
  const draft = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE,
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
  } as IPost;

  const goArticleCreationView = () => {
    history.push(`/create-article`);
  };

  return (
    <Container>
      <PostView post={post} />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        style={{
          marginTop: '10px',
          padding: '10px',
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          onClick={goArticleCreationView}
        >
          Назад до редагування
        </Button>
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </Container>
  );
};

export default ArticleCreationPreview;
