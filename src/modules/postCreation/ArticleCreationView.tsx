import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import ArticleEditor from '../../lib/components/Editor/Editors/ArticleEditor';
import { RootStateType } from '../../store/rootReducer';
import {
  setPostTopics,
  setPostTitle,
  setPostBody,
} from './store/postCreationSlice';
import { ICheckboxes, PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../lib/types';

const ArticleCreationView: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft,
  );

  const [title, setTitle] = useState({
    value: savedPostDraft.ARTICLE.title || '',
    error: '',
  });

  // that will always dispatch initial state instead of latest one if deps is empty.
  // if deps are included, it will dispatch every update except the latest one.
  // useEffect(() => {
  //   return () => {
  //     dispatch(setPostTitle(title.value));
  //   };
  // }, []);

  // this works fine
  // history.listen(() => {
  //   dispatch(setPostTitle(title.value));
  // });

  const dispatchTopics = (topics: ICheckboxes) => {
    dispatch(setPostTopics({ postType: PostTypeEnum.ARTICLE, value: topics }));
  };

  const dispatchTitle = useCallback(
    _.debounce((storedTitle: string) => {
      dispatch(
        setPostTitle({ postType: PostTypeEnum.ARTICLE, value: storedTitle }),
      );
    }, 1000),
    [],
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(setPostBody({ postType: PostTypeEnum.ARTICLE, value: content }));
    }, 2000),
    [],
  );

  return (
    <Container fixed>
      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={dispatchTopics}
          topicList={directions}
          prevCheckedTopics={
            _.isEmpty(savedPostDraft.ARTICLE.topics)
              ? undefined
              : savedPostDraft.ARTICLE.topics
          }
        />
      ) : (
        <CircularProgress />
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
            dispatchTitle(e.target.value);
          }}
        />
      </Box>
      <Typography variant="h5">Текст статті:</Typography>
      <ArticleEditor dispatchContent={dispatchHtmlContent} />;
    </Container>
  );
};

export default ArticleCreationView;
