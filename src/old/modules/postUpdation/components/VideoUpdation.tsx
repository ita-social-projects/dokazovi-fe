import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { IDirection, IPost } from '../../../lib/types';
import {
  UpdateVideoPostRequestType,
  ExpertResponseType,
} from '../../../lib/utilities/API/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PostCreationButtons } from '../../postCreation/components/PostCreationButtons';
import { updatePost, getAllExperts } from '../../../lib/utilities/API/api';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';
import { PostDirectionsSelector } from '../../postCreation/components/PostDirectionsSelector';
import { PostAuthorSelection } from '../../postCreation/components/PostAuthorSelection/PostAuthorSelection';

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

  const [authors, setAuthors] = useState<ExpertResponseType[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [author, setAuthor] = useState<ExpertResponseType>();
  const [searchValue, setSearchValue] = useState('');

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

  const handleOnChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) {
      setAuthors([]);
      return;
    }
    getAllExperts({ params: { userName: searchValue.trim() } }).then((res) => {
      setAuthors(res.data.content);
    });
  }, [searchValue]);

  const onAuthorTableClick = (value: number, item: ExpertResponseType) => {
    setAuthorId(value);
    setAuthor(item);
    setAuthors([]);
    setSearchValue('');
  };

  const videoId = parseVideoIdFromUrl(videoUrl);

  const updatedPost: UpdateVideoPostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    title: title.value,
    preview: post.preview, // currently leaving the previous preview
    videoUrl,
    type: post.type,
    authorId: authorId ?? post.author.id,
  };

  const previewPost: IPost = {
    ...post,
    author: {
      avatar: author?.avatar ?? post.author.avatar,
      firstName: author?.firstName ?? post.author.firstName,
      id: author?.id ?? post.author.id,
      lastName: author?.lastName ?? post.author.lastName,
      mainInstitution: author?.mainInstitution ?? post.author.mainInstitution,
    },
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
          <PostAuthorSelection
            onAuthorTableClick={onAuthorTableClick}
            handleOnChange={handleOnChange}
            authors={authors}
            searchValue={searchValue}
          />
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
