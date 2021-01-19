import React from 'react';
import { Container, Button } from '@material-ui/core';
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
      <Button onClick={articleCreationView}>Назад до редагування</Button>
      <Button>Опублікувати</Button>
    </Container>
  );
};

export default ArticleCreationPreview;
