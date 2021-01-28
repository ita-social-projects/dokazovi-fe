import React, { useCallback, useState } from 'react';
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
  setPostBody,
} from './store/postCreationSlice';
import { ICheckboxes, PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum, IDirectionIDs } from '../../lib/types';
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

  const allDirections = Object.keys(savedPostDraft.topics)
    .filter((id) => savedPostDraft.topics[id])
    .map((direction) => ({ id: Number(direction) }));

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

  const publishNewArticle = () => {
    if (Object.values(newPost).some((value) => !value)) {
      console.log('There is an empty value');
    } else {
      sendPost();
    }
  };

  const goArticlePreview = () => {
    history.push(`/create-article/preview`, {
      postType: 'ARTICLE',
      publishPost: publishNewArticle,
    });
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
      <Box mt={2}>
        <Container>
          <Typography variant="h5">Текст статті:</Typography>
        </Container>
        <ArticleEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          newPost={publishNewArticle}
          goPreview={goArticlePreview}
        />
      </Box>
    </Container>
  );
};

export default ArticleCreation;
