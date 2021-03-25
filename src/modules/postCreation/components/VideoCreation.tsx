import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  CircularProgress,
  Typography,
  TextField,
  Box,
} from '@material-ui/core';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import {
  setPostTopics,
  setPostTitle,
  setPostBody,
  setIsDone,
  setVideoUrl,
} from '../store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import { PostCreationButtons } from './PostCreationButtons';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';

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

  const url = useSelector(
    (state: RootStateType) => state.newPostDraft.VIDEO.videoUrl,
  );

  const videoId = parseVideoIdFromUrl(url as string);

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

  const dispatchVideoUrl = useCallback(
    _.debounce((videoUrl: string) => {
      dispatch(setVideoUrl({ postType: PostTypeEnum.VIDEO, value: videoUrl }));
    }, 500),
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

  const newPost: CreatePostRequestType = {
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.htmlContent,
    type: { id: 3 }, // must not be hardcoded
    title: savedPostDraft.title,
    videoUrl: savedPostDraft.videoUrl,
  };

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goVideoPreview = () => {
    history.push(`/create-video/preview`, {
      postType: 'VIDEO',
      publishPost: newPost,
    });
  };

  return (
    <>
      <PageTitle title="Створення відео" />

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
      </Box>
      <Box mt={2}>
        <VideoUrlInputModal dispatchVideoUrl={dispatchVideoUrl} />
        {videoId && (
          <iframe
            title="video"
            width="360"
            height="240"
            src={`http://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Опис відео:</Typography>
        <VideoEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goVideoPreview}
          isDone={isDone}
        />
      </Box>
    </>
  );
};

export default VideoCreation;
