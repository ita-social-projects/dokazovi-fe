import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Container,
  CircularProgress,
  Typography,
  TextField,
  Box,
} from '@material-ui/core';
import VideoEditor from '../../lib/components/Editor/Editors/VideoEditor';
import {
  setPostTopics,
  setPostTitle,
  setPostBody,
  setIsDone,
} from './store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../lib/types';
import { RootStateType } from '../../store/rootReducer';
import { sanitizeHtml } from '../../lib/utilities/sanitizeHtml';
import { postPublishPost } from '../../lib/utilities/API/api';
import PostCreationButtons from '../../lib/components/PostCreationButtons/PostCreationButtons';
import { PostPostRequestType } from '../../lib/utilities/API/types';

const VideoCreation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.VIDEO,
  );

  const [title, setTitle] = useState({
    value: savedPostDraft.title || '',
    error: '',
  });

  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.VIDEO.isDone,
  );

  const dispatchTopics = (topics: string[]) => {
    dispatch(setPostTopics({ postType: PostTypeEnum.VIDEO, value: topics }));
  };

  const dispatchTitle = useCallback(
    _.debounce((storedTitle: string) => {
      dispatch(
        setPostTitle({ postType: PostTypeEnum.VIDEO, value: storedTitle }),
      );
    }, 1000),
    [],
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.VIDEO,
          value: sanitizeHtml(content) as string,
        }),
      );
      dispatch(
        setIsDone({
          postType: PostTypeEnum.VIDEO,
          value: true,
        }),
      );
    }, 2000),
    [],
  );

  const allDirections = directions.filter((direction) =>
    savedPostDraft.topics.includes(direction.id.toString()),
  );

  const newPost = {
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.htmlContent,
    type: { id: 3 },
  } as PostPostRequestType;

  const sendPost = async () => {
    const responsePost = await postPublishPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goVideoPreview = () => {
    history.push(`/create-video/preview`, {
      postType: 'VIDEO',
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
          <Typography variant="h5">Заголовок відео: </Typography>
          <TextField
            error={Boolean(title.error)}
            helperText={title.error}
            fullWidth
            required
            id="video-name"
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
          <Typography variant="h5">Опис відео:</Typography>
        </Container>
        <VideoEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goVideoPreview}
          isDone={isDone}
        />
      </Box>
    </Container>
  );
};

export default VideoCreation;
