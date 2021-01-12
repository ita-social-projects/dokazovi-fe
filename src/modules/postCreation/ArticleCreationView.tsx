import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, TextField, Typography } from '@material-ui/core';
import ArticleEditor from '../../lib/components/Editor/Editors/ArticleEditor';
import { RootStateType } from '../../store/rootReducer';
import { setPostDirections } from './store/postCreationSlice';
import { ArticleTopics } from './ArticleTopics';

const ArticleCreationView: React.FC = () => {
  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );

  const [title, setTitle] = useState({
    value: '',
    error: '',
  });

  return (
    <Container fixed>
      {directions.length && (
        <ArticleTopics setTopics={setPostDirections} topics={directions} />
      )}
      <Box display="flex">
        <Typography variant="h5">Заголовок статті: </Typography>
        <TextField
          error={Boolean(title.error)}
          helperText={title.error}
          fullWidth
          required
          id="article-name"
          value={title.value}
          onChange={(e) => setTitle({ ...title, value: e.target.value })}
        />
      </Box>
      <Typography variant="h5">Текст статті:</Typography>
      <ArticleEditor />;
    </Container>
  );
};

export default ArticleCreationView;
