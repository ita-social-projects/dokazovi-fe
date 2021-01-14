import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, TextField, Typography } from '@material-ui/core';
import ArticleEditor from '../../lib/components/Editor/Editors/ArticleEditor';
import { RootStateType } from '../../store/rootReducer';
import { setPostTopics, setPostTitle } from './store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';

const ArticleCreationView: React.FC = () => {
  const dispatch = useDispatch();
  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft,
  );

  const [title, setTitle] = useState({
    value: savedPostDraft.title || '',
    error: '',
  });

  // that will always dispatch initial state instead of latest one if deps is empty.
  // if deps are included, it will dispatch every update except the latest one.
  // useEffect(() => {
  //   return () => {
  //     dispatch(setPostTitle(title.value));
  //   };
  // }, []);

  return (
    <Container fixed>
      {directions.length && (
        <PostTopicSelector
          setTopics={setPostTopics}
          topicList={directions}
          prevCheckedTopics={
            _.isEmpty(savedPostDraft.topics) ? undefined : savedPostDraft.topics
          }
        />
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
          onChange={(e) => {
            setTitle({ ...title, value: e.target.value });
            dispatch(setPostTitle(e.target.value));
          }}
        />
      </Box>
      <Typography variant="h5">Текст статті:</Typography>
      <ArticleEditor />;
    </Container>
  );
};

export default ArticleCreationView;
