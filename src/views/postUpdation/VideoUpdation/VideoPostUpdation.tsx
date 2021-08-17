import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { PageTitle } from 'components/Page/PageTitle';
import { useSelector } from 'react-redux';
import { sanitizeHtml } from '../../../old/lib/utilities/sanitizeHtml';
import { updatePost, getAllExperts } from '../../../old/lib/utilities/API/api';
import { IDirection, IPost, IOrigin } from '../../../old/lib/types';
import { PostCreationButtons } from '../../postCreation/PostCreationButtons';
import {
  UpdateVideoPostRequestType,
  ExpertResponseType,
} from '../../../old/lib/utilities/API/types';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../old/lib/constants/editors';
import VideoUrlInputModal from '../../../components/Editor/CustomModules/VideoUrlInputModal';
import { parseVideoIdFromUrl } from '../../../old/lib/utilities/parseVideoIdFromUrl';
import PostView from '../../../old/modules/posts/components/PostView';
import { TextPostEditor } from '../../../components/Editor/Editors/TextPostEditor';
import { IEditorToolbarProps } from '../../../components/Editor/types';
import { PostDirectionsSelector } from '../../postCreation/PostDirectionsSelector';
import { PostOriginsSelector } from '../../postCreation/PostOriginsSelector';
import { PostAuthorSelection } from '../../postCreation/PostAuthorSelection/PostAuthorSelection';
import { BorderBottom } from '../../../old/lib/components/Border';
import { useStyle } from '../../postCreation/RequiredFieldsStyle';
import { selectAuthorities } from '../../../models/authorities';

export interface ITextPostUpdationProps {
  pageTitle: string;
  titleInputLabel: string;
  contentInputLabel: string;
  editorToolbar: React.ComponentType<IEditorToolbarProps>;
  post: IPost;
}

export const VideoPostUpdation: React.FC<ITextPostUpdationProps> = ({
  pageTitle,
  titleInputLabel,
  contentInputLabel,
  editorToolbar,
  post,
}) => {
  const history = useHistory();
  const classes = useStyle();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [selectedOrigins, setSelectedOrigins] = useState<IOrigin[]>(
    post.origins,
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
  const [videoUrl, setVideoUrl] = useState<string>(post.videoUrl as string);
  const [preview, setPreview] = useState(post.preview);
  const [title, setTitle] = useState({
    value: post.title,
    error: '',
  });

  const [authors, setAuthors] = useState<ExpertResponseType[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [author, setAuthor] = useState<ExpertResponseType>();
  const [searchValue, setSearchValue] = useState('');

  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);

  const handleDirectionsChange = (value: IDirection[]) => {
    setSelectedDirections(value);
  };

  const handleOriginsChange = (value: IOrigin[]) => {
    setSelectedOrigins(value);
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      setHtmlContent(sanitizeHtml(value));
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewChange = useCallback(
    _.debounce((value: string) => {
      setPreview(value);
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
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
    const authorFullName = `${item.firstName} ${item.lastName}`;
    setAuthorId(value);
    setAuthor(item);
    setAuthors([]);
    setSearchValue(authorFullName);
  };

  const videoId = parseVideoIdFromUrl(videoUrl);

  const updatedPost: UpdateVideoPostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    origins: selectedOrigins,
    preview,
    videoUrl,
    title: title.value,
    type: post.type,
    authorId: authorId ?? post.author.id,
  };

  const isEmpty =
    !updatedPost.title ||
    !updatedPost.directions.length ||
    updatedPost.content.length < 15 ||
    !updatedPost.videoUrl;

  const previewPost: IPost = {
    ...post,
    author: {
      avatar: author?.avatar ?? post.author.avatar,
      bio: author?.bio ?? post.author.bio,
      firstName: author?.firstName ?? post.author.firstName,
      id: author?.id ?? post.author.id,
      lastName: author?.lastName ?? post.author.lastName,
      mainInstitution: author?.mainInstitution ?? post.author.mainInstitution,
    },
    content: htmlContent,
    preview,
    videoUrl,
    directions: selectedDirections,
    origins: selectedOrigins,
    title: title.value,
    type: post.type,
  };

  const handlePublishClick = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  const postOriginSelector = isAdmin ? (
    <PostOriginsSelector
      selectedOrigins={selectedOrigins}
      onSelectedOriginsChange={handleOriginsChange}
    />
  ) : null;

  const postAuthorSelection = isAdmin ? (
    <PostAuthorSelection
      onAuthorTableClick={onAuthorTableClick}
      handleOnChange={handleOnChange}
      authors={authors}
      searchValue={searchValue}
    />
  ) : null;

  return (
    <>
      <PageTitle title={pageTitle} />

      {!previewing ? (
        <>
          <PostDirectionsSelector
            selectedDirections={selectedDirections}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
          {postOriginSelector}
          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {titleInputLabel}
            </Typography>
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
          {postAuthorSelection}
          <Box mt={2}>
            <VideoUrlInputModal dispatchVideoUrl={setVideoUrl} />
            {videoId && (
              <iframe
                title="video"
                width="360"
                height="240"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              />
            )}
          </Box>
          <BorderBottom />
          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {contentInputLabel}
            </Typography>
            <TextPostEditor
              toolbar={editorToolbar}
              initialHtmlContent={htmlContent}
              initialPreview={preview}
              onHtmlContentChange={(value) => {
                setTyping({ ...typing, content: true });
                handleHtmlContentChange(value);
              }}
              initialWasPreviewManuallyChanged
              onPreviewChange={(value) => {
                setTyping({ ...typing, preview: true });
                handlePreviewChange(value);
              }}
              previewPost={previewPost}
            />
          </Box>
        </>
      ) : (
        <PostView post={previewPost} />
      )}

      <PostCreationButtons
        action="updating"
        isEmpty={isEmpty}
        onCancelClick={() => {
          history.goBack();
        }}
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
