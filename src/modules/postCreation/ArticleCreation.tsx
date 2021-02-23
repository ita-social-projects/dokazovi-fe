import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
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
  setIsDone,
  setPostBody,
} from './store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../lib/types';
import { postPublishPost } from '../../lib/utilities/API/api';
import { sanitizeHtml } from '../../lib/utilities/sanitizeHtml';
import PostCreationButtons from '../../lib/components/PostCreationButtons/PostCreationButtons';
import { PostPostRequestType } from '../../lib/utilities/API/types';

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

  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE.isDone,
  );

  const dispatchTopics = (topics: string[]) => {
    dispatch(setPostTopics({ postType: PostTypeEnum.ARTICLE, value: topics }));
  };

  const dispatchTitle = useMemo(
    () =>
      _.debounce((storedTitle: string) => {
        dispatch(
          setPostTitle({ postType: PostTypeEnum.ARTICLE, value: storedTitle }),
        );
      }, 1000),
    [dispatch],
  );

  const dispatchHtmlContent = useMemo(
    () =>
      _.debounce((content: string) => {
        dispatch(
          setPostBody({
            postType: PostTypeEnum.ARTICLE,
            value: sanitizeHtml(content) as string,
          }),
        );
        dispatch(
          setIsDone({
            postType: PostTypeEnum.ARTICLE,
            value: true,
          }),
        );
      }, 2000),
    [dispatch],
  );

  const allDirections = directions.filter((direction) =>
    savedPostDraft.topics.includes(direction.id.toString()),
  );

  const newPost = {
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    type: { id: 1 },
  } as PostPostRequestType;

  const sendPost = async () => {
    const responsePost = await postPublishPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goArticlePreview = () => {
    history.push(`/create-article/preview`, {
      postType: 'ARTICLE',
      publishPost: newPost,
    });
  };

  return (
    <Container fixed>
      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={dispatchTopics}
          topicList={directions}
          prevCheckedTopicsIds={
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
      <Box mt={2}>
        <Container>
          <Typography variant="h5">Текст статті:</Typography>
        </Container>
        <ArticleEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goArticlePreview}
          isDone={isDone}
        />
      </Box>
    </Container>
  );
};

export default ArticleCreation;
