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
import { updatePost } from '../../../lib/utilities/API/api';
import { RootStateType } from '../../../store/rootReducer';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';

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

  const [typing, setTyping] = useState({ content: false });
  const [previewing, setPreviewing] = useState(false);

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const handleDirectionsChange = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    setSelectedDirections(directions);
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((content: string) => {
      setHtmlContent(sanitizeHtml(content) as string);
      setTyping({ ...typing, content: false });
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

  const handlePublishClick = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  return (
    <>
      <PageTitle title="Редагування відео" />

      {!previewing ? (
        <>
          {allDirections.length ? (
            <CheckboxDropdownFilterForm
              onFormChange={handleDirectionsChange}
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
              initialHtmlContent={htmlContent}
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
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          onPublishClick={handlePublishClick}
          onPreviewClick={() => {
            setPreviewing(!previewing);
          }}
          previewing={previewing}
          disabled={Object.values(typing).some((i) => i)}
        />
      </Box>
    </>
  );
};

export default VideoUpdation;
