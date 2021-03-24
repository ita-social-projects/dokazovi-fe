import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { IDirection, IPost } from '../../../lib/types';
import { UpdateVideoPostRequestType } from '../../../lib/utilities/API/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import PostCreationButtons from '../../postCreation/components/PostCreationButtons';
import { PostPreviewLocationStateType } from '../../postCreation/components/PostPreviewWrapper';
import { updatePost } from '../../../lib/utilities/API/api';
import { RootStateType } from '../../../store/rootReducer';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';

export interface IVideoUpdationProps {
  post: IPost;
}

const VideoUpdation: React.FC<IVideoUpdationProps> = ({ post }) => {
  const history = useHistory();
  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
  const [videoUrl, setVideoUrl] = useState<string>(post.videoUrl as string);
  const [title, setTitle] = useState({
    value: post.title,
    error: '',
  });

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const dispatchDirections = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    setSelectedDirections(directions);
  };

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      setHtmlContent(sanitizeHtml(content) as string);
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const videoId = parseVideoIdFromUrl(videoUrl);

  const updatedPost: UpdateVideoPostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    title: title.value,
    preview: post.preview, // currently leaving the previous preview
    videoUrl,
    type: post.type,
  };

  const previewPost: IPost = {
    ...post,
    content: htmlContent,
    directions: selectedDirections,
    title: title.value,
    type: post.type,
  };

  const sendPost = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  const goVideoPreview = () => {
    const state: PostPreviewLocationStateType = {
      actionType: 'update',
      postToSend: updatedPost,
      previewPost,
    };

    history.push(`/update-video/preview`, state);
  };

  return (
    <>
      <PageTitle title="Редагування відео" />

      {allDirections.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={dispatchDirections}
          possibleFilters={allDirections}
          selectedFilters={selectedDirections}
          noAll
          maximumReached={selectedDirections.length === 3}
          filterTitle="Напрямки: "
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
          }}
        />
      </Box>
      <Box mt={2}>
        <VideoUrlInputModal dispatchVideoUrl={setVideoUrl} />
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
          initialContent={htmlContent}
          dispatchContent={dispatchHtmlContent}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goVideoPreview}
        />
      </Box>
    </>
  );
};

export default VideoUpdation;
