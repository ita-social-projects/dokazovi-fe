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

  const post = {
    ...mockPost,
    content: draft.htmlContent,
    preview: draft.preview,
    title: draft.title,
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
