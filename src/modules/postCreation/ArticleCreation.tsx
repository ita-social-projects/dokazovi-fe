import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
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
import { sanitizeHtml } from '../../lib/utilities/sanitizeHtml';

const ArticleCreation: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE,
  );

  const [title, setTitle] = useState({
    value: savedPostDraft.title || '',
    error: '',
  });

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
      dispatch(
        setPostBody({
          postType: PostTypeEnum.ARTICLE,
          value: sanitizeHtml(content) as string,
        }),
      );
    }, 2000),
    [],
  );

  const goArticlePreview = () => {
    history.push(`/create-article/preview`);
  };

  return (
    <Container fixed>
      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={dispatchTopics}
          topicList={directions}
          prevCheckedTopics={
            _.isEmpty(savedPostDraft.topics) ? undefined : savedPostDraft.topics
          }
        />
      ) : (
        <CircularProgress />
      )}
      <Box mt={2}>
        <Container>
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
        </Container>
      </Box>
      {/* <Box mt={2}>
        <Container>
          <Typography variant="h5">Текст статті:</Typography>
        </Container>
        <ArticleEditor dispatchContent={dispatchHtmlContent} />
      </Box> */}
      <Typography variant="h5">Текст статті:</Typography>
      <ArticleEditor dispatchContent={dispatchHtmlContent} />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        style={{
          marginLeft: '14px',
          marginRight: '14px',
          marginTop: '10px',
          padding: '10px',
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          onClick={goArticlePreview}
        >
          Попередній перегляд
        </Button>
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </Container>
  );
};

export default ArticleCreation;
