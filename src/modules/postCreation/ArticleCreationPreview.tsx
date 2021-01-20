import React from 'react';
import { Container, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostPreview from '../posts/components/PostPreview';
import { RootStateType } from '../../store/rootReducer';

const ArticleCreationPreview: React.FC = () => {
  const history = useHistory();
  const draft = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE,
  );

  const articleCreationView = () => {
    history.push(`/create-article`);
  };

  return (
    <Container>
      <PostPreview draft={draft} />
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
          onClick={articleCreationView}
        >
          Назад до редагування
        </Button>
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </Container>
  );
};

export default ArticleCreationPreview;
