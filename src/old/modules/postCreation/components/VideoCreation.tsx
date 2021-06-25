import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import VideoEditor from '../../../lib/components/Editor/Editors/VideoEditor';
import {
  resetDraft,
  selectVideoPostDraft,
  selectVideoUrl,
  setAuthorId,
  setAuthorsDetails,
  setAuthorsName,
  setPostBody,
  setPostDirections,
  setPostOrigin,
  setPostTitle,
  setVideoUrl,
} from '../../../../models/postCreation';
import { IDirection, IOrigin, IPost, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { parseVideoIdFromUrl } from '../../../lib/utilities/parseVideoIdFromUrl';
import VideoUrlInputModal from '../../../lib/components/Editor/CustomModules/VideoUrlInputModal';
import { PostCreationButtons } from './PostCreationButtons';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { createPost, getAllExperts } from '../../../lib/utilities/API/api';
import {
  CreateVideoPostRequestType,
  ExpertResponseType,
} from '../../../lib/utilities/API/types';
import { CONTENT_DEBOUNCE_TIMEOUT } from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';
import { PostDirectionsSelector } from './PostDirectionsSelector';
import { PostOriginsSelector } from './PostOriginsSelector';
import { selectCurrentUser } from '../../../../models/user/selectors';
import { PostAuthorSelection } from './PostAuthorSelection/PostAuthorSelection';
import { setGALocation } from '../../../../utilities/setGALocation';
import { useActions } from '../../../../shared/hooks';
import { langTokens } from '../../../../locales/localizationInit';

const VideoCreation: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const savedPostDraft = useSelector(selectVideoPostDraft);

  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState({
    value: savedPostDraft.title,
    error: '',
  });

  const [authorsName, setAuthName] = useState({
    value: savedPostDraft.authorsName,
    error: '',
  });

  const [authorsDetails, setAuthDetails] = useState({
    value: savedPostDraft.authorsDetails,
    error: '',
  });

  const [typing, setTyping] = useState({ content: false });
  const [previewing, setPreviewing] = useState(false);
  const [authors, setAuthors] = useState<ExpertResponseType[]>([]);
  const [author, setAuthor] = useState<ExpertResponseType | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const videoUrl = useSelector(selectVideoUrl);

  const videoId = parseVideoIdFromUrl(videoUrl);

  const [
    boundSetPostDirections,
    boundSetPostOrigin,
    boundSetPostTitle,
    boundSetAuthorsName,
    boundSetAuthorsDetails,
    boundSetVideoUrl,
    boundSetPostBody,
    boundSetAuthorId,
    boundResetDraft,
  ] = useActions([
    setPostDirections,
    setPostOrigin,
    setPostTitle,
    setAuthorsName,
    setAuthorsDetails,
    setVideoUrl,
    setPostBody,
    setAuthorId,
    resetDraft,
  ]);

  const handleDirectionsChange = (value: IDirection[]) => {
    boundSetPostDirections({ postType: PostTypeEnum.VIDEO, value });
  };

  const handleOriginsChange = (value: IOrigin[]) => {
    setAuthName({ ...authorsName, value: '' });
    setAuthDetails({ ...authorsDetails, value: '' });
    boundSetPostOrigin({ postType: PostTypeEnum.VIDEO, value });
  };

  const handleTitleChange = (value: string) => {
    boundSetPostTitle({ postType: PostTypeEnum.VIDEO, value });
  };

  const handleAuthorsNameChange = (value: string) => {
    boundSetAuthorsName({ postType: PostTypeEnum.VIDEO, value });
  };

  const handleAuthorsDetailsChange = (value: string) => {
    boundSetAuthorsDetails({ postType: PostTypeEnum.VIDEO, value });
  };

  const handleVideoUrlChange = (url: string) => {
    boundSetVideoUrl(url);
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      boundSetPostBody({
        postType: PostTypeEnum.VIDEO,
        value: sanitizeHtml(value),
      });
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handleOnChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    setGALocation(window);
  }, []);

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
    boundSetAuthorId({
      postType: PostTypeEnum.VIDEO,
      value,
    });
    setAuthor(item);
    setAuthors([]);
    setSearchValue('');
  };

  const newPost: CreateVideoPostRequestType = {
    authorId: savedPostDraft.authorId,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origins: savedPostDraft.origins,
    preview: savedPostDraft.htmlContent, // currently no preview
    type: { id: PostTypeEnum.VIDEO },
    title: savedPostDraft.title,
    authorsName: savedPostDraft.authorsName,
    authorsDetails: savedPostDraft.authorsDetails,
    videoUrl: savedPostDraft.videoUrl,
  };

  const handlePublishClick = async () => {
    const responsePost = await createPost(newPost);
    boundResetDraft(PostTypeEnum.VIDEO);
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
        type: { id: PostTypeEnum.VIDEO, name: t(langTokens.common.video) },
      } as IPost),
    [user, savedPostDraft],
  );

  let extraFieldsForTranslation: null | JSX.Element = null;

  if (savedPostDraft.origins[0]) {
    if (savedPostDraft.origins[0].id === 3) {
      extraFieldsForTranslation = (
        <>
          <Box mt={2}>
            <Typography variant="h5">
              {t(langTokens.experts.expertName)}
            </Typography>
            <TextField
              error={Boolean(authorsName.error)}
              helperText={authorsName.error}
              fullWidth
              required
              id="authorsName"
              value={authorsName.value}
              onChange={(e) => {
                setAuthName({ ...authorsName, value: e.target.value });
                handleAuthorsNameChange(e.target.value);
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h5">
              {t(langTokens.experts.expertDetailInfo)}
            </Typography>
            <TextField
              error={Boolean(authorsDetails.error)}
              helperText={authorsDetails.error}
              fullWidth
              required
              id="authorsDetails"
              value={authorsDetails.value}
              onChange={(e) => {
                setAuthDetails({ ...authorsDetails, value: e.target.value });
                handleAuthorsDetailsChange(e.target.value);
              }}
            />
          </Box>
        </>
      );
    } else {
      handleAuthorsNameChange('');
      handleAuthorsDetailsChange('');
    }
  }

  return (
    <>
      <PageTitle title={t(langTokens.editor.videoCreation)} />

      {!previewing ? (
        <>
          <PostDirectionsSelector
            selectedDirections={savedPostDraft.directions}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
          <PostOriginsSelector
            selectedOrigins={savedPostDraft.origins}
            onSelectedOriginsChange={handleOriginsChange}
          />
          {extraFieldsForTranslation}
          <Box mt={2}>
            <Typography variant="h5">{`${t(
              langTokens.editor.videoTitle,
            )}:`}</Typography>
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
          <PostAuthorSelection
            onAuthorTableClick={onAuthorTableClick}
            handleOnChange={handleOnChange}
            authors={authors}
            searchValue={searchValue}
          />
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
            <Typography variant="h5">{`${t(
              langTokens.editor.videoDescription,
            )}:`}</Typography>
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
