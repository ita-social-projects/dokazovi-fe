import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import ArticleEditor from '../../../lib/components/Editor/Editors/ArticleEditor';
import { RootStateType } from '../../../store/rootReducer';
import {
  setPostTopics,
  setPostTitle,
  setIsDone,
  setPostBody,
  setImageUrl,
} from '../store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PostCreationButtons } from './PostCreationButtons';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { BorderBottom } from '../../../lib/components/Border';
import { getStringFromFile } from '../../../lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../../lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../../lib/components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';

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

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    '',
  );
  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE.isDone,
  );

  const dispatchTopics = (topics: string[]) => {
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

  const dispatchImageUrl = (backgroundImageUrl: string): void => {
    dispatch(
      setImageUrl({
        postType: PostTypeEnum.ARTICLE,
        value: backgroundImageUrl,
      }),
    );
  };

  const dispatchHtmlContent = useCallback(
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
    [],
  );

  const allDirections = directions.filter((direction) =>
    savedPostDraft.topics.includes(direction.id.toString()),
  );

  const newPost: CreatePostRequestType = {
    backgroundImageUrl: savedPostDraft.backgroundImageUrl || backgroundImage,
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    type: { id: 1 }, // must not be hardcoded
  };

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goArticlePreview = () => {
    history.push(`/create-article/preview`, {
      postType: 'ARTICLE',
      publishPost: newPost,
    });
  };

  const fileSelectorHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    getStringFromFile(e.target.files)
      .then((str) => uploadImageToImgur(str))
      .then((res) => {
        if (res.data.status === 200) {
          setBackgroundImage(res.data.data.link);
        }
      });
  };

  return (
    <>
      <PageTitle title="Створення статті" />

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
      <BackgroundImageContainer
        dispatchImageUrl={dispatchImageUrl}
        fileSelectorHandler={fileSelectorHandler}
        newPost={newPost}
      />
      <BorderBottom />
      <Box mt={2}>
        <Typography variant="h5">Текст статті:</Typography>
        <ArticleEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goArticlePreview}
          isDone={isDone}
        />
      </Box>
    </>
  );
};

export default ArticleCreation;
