import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { IDirection, IPost } from '../../../lib/types';
import { UpdateVideoPostRequestType } from '../../../lib/utilities/API/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PostCreationButtons } from '../../postCreation/components/PostCreationButtons';
import { updatePost } from '../../../lib/utilities/API/api';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';
import { PostDirectionsSelector } from '../../postCreation/components/PostDirectionsSelector';

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

  const handleDirectionsChange = (value: IDirection[]) => {
    setSelectedDirections(value);
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      setHtmlContent(sanitizeHtml(value));
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
          <PostDirectionsSelector
            selectedDirections={selectedDirections}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
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

      <PostCreationButtons
        action="updating"
        onCancelClick={() => history.goBack()}
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

export default VideoUpdation;
