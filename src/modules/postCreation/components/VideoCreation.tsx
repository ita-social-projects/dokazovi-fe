import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Typography, TextField, Box } from '@material-ui/core';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import {
  setPostTitle,
  setPostBody,
  setVideoUrl,
  setPostDirections,
  resetDraft,
} from '../store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CreateVideoPostRequestType } from '../../../lib/utilities/API/types';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';
import { PostDirectionsSelector } from './PostDirectionsSelector';
import { selectCurrentUser } from '../../../store/user/selectors';

const VideoCreation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft[PostTypeEnum.VIDEO],
  );
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState({
    value: savedPostDraft.title,
    error: '',
  });

  const [typing, setTyping] = useState({ content: false });
  const [previewing, setPreviewing] = useState(false);

  const videoUrl = useSelector(
    (state: RootStateType) => state.newPostDraft[PostTypeEnum.VIDEO].videoUrl,
  );

  const videoId = parseVideoIdFromUrl(videoUrl);

  const handleDirectionsChange = (value: IDirection[]) => {
    dispatch(setPostDirections({ postType: PostTypeEnum.VIDEO, value }));
  };

  const handleTitleChange = (value: string) => {
    dispatch(setPostTitle({ postType: PostTypeEnum.VIDEO, value }));
  };

  const handleVideoUrlChange = (url: string) => {
    dispatch(setVideoUrl(url));
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.VIDEO,
          value: sanitizeHtml(value),
        }),
      );
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const newPost: CreateVideoPostRequestType = {
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    preview: savedPostDraft.htmlContent, // currently no preview
    type: { id: PostTypeEnum.VIDEO },
    title: savedPostDraft.title,
    videoUrl: savedPostDraft.videoUrl,
  };

  const handlePublishClick = async () => {
    const responsePost = await createPost(newPost);
    dispatch(resetDraft(PostTypeEnum.VIDEO));
    history.push(`/posts/${responsePost.data.id}`);
  };

  const previewPost = React.useMemo(
    () =>
      ({
        author: user.data,
        content: savedPostDraft.htmlContent,
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        directions: savedPostDraft.directions,
        title: savedPostDraft.title,
        videoUrl: savedPostDraft.videoUrl,
        type: { id: PostTypeEnum.VIDEO, name: 'Відео' },
      } as IPost),
    [user, savedPostDraft],
  );

  return (
    <>
      <PageTitle title="Створення відео" />

      {!previewing ? (
        <>
          <PostDirectionsSelector
            selectedDirections={savedPostDraft.directions}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
          <Box mt={2}>
            <Typography variant="h5">Заголовок відео:</Typography>
            <TextField
              error={Boolean(title.error)}
              helperText={title.error}
              fullWidth
              required
              id="video-name"
              value={title.value}
              onChange={(e) => {
                setTitle({ ...title, value: e.target.value });
                handleTitleChange(e.target.value);
              }}
            />
          </Box>
          <Box mt={2}>
            <VideoUrlInputModal dispatchVideoUrl={handleVideoUrlChange} />
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
            <VideoEditor
              initialHtmlContent={savedPostDraft.htmlContent}
              onHtmlContentChange={(value) => {
                setTyping({ ...typing, content: true });
                handleHtmlContentChange(value);
              }}
            />
          </Box>
        </>
      ) : (
        <PostView post={previewPost} />
      )}

      <PostCreationButtons
        action="creating"
        onPublishClick={handlePublishClick}
        onPreviewClick={() => {
          setPreviewing(!previewing);
        }}
        previewing={previewing}
        disabled={Object.values(typing).some((i) => i)}
      />
    </>
  );
};

export default VideoCreation;
