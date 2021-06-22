import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  setPostDirections,
  setPostOrigin,
  setPostTitle,
  setAuthorsName,
  setAuthorsDetails,
  setPostBody,
  setVideoUrl,
  selectVideoUrl,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  resetDraft,
  setAuthorId,
  selectVideoPostDraft,
} from '../../../models/postCreation';
import {
  IDirection,
  IPost,
  IOrigin,
  PostTypeEnum,
} from '../../../old/lib/types';
import { sanitizeHtml } from '../../../old/lib/utilities/sanitizeHtml';
import { parseVideoIdFromUrl } from '../../../old/lib/utilities/parseVideoIdFromUrl';
import VideoUrlInputModal from '../../../old/lib/components/Editor/CustomModules/VideoUrlInputModal';
import { PostCreationButtons } from '../../../old/modules/postCreation/components/PostCreationButtons';
import {
  CreateVideoPostRequestType,
  ExpertResponseType,
} from '../../../old/lib/utilities/API/types';
import { PageTitle } from '../../../old/lib/components/Pages/PageTitle';
import { createPost, getAllExperts } from '../../../old/lib/utilities/API/api';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../old/lib/constants/editors';
import PostView from '../../../old/modules/posts/components/PostView';
import { TextPostEditor } from '../../../old/lib/components/Editor/Editors/TextPostEditor';
import { IEditorToolbarProps } from '../../../old/lib/components/Editor/types';
import { PostDirectionsSelector } from '../../../old/modules/postCreation/components/PostDirectionsSelector';
import { PostOriginsSelector } from '../../../old/modules/postCreation/components/PostOriginsSelector';
import { BorderBottom } from '../../../old/lib/components/Border';
import { PostAuthorSelection } from '../../../old/modules/postCreation/components/PostAuthorSelection/PostAuthorSelection';

import { selectCurrentUser } from '../../../models/user/selectors';
import { useActions } from '../../../shared/hooks';
import { langTokens } from '../../../locales/localizationInit';

interface IVideoPostCreationProps {
  pageTitle?: string;
  titleInputLabel?: string;
  contentInputLabel?: string;
  editorToolbar: React.ComponentType<IEditorToolbarProps>;
}

type ExtraFieldsType = null | JSX.Element;

export const VideoPostCreation: React.FC<IVideoPostCreationProps> = ({
  pageTitle,
  titleInputLabel,
  contentInputLabel,
  editorToolbar,
}) => {
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

  const [typing, setTyping] = useState({ content: false, preview: false });
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
    boundSetPostPreviewText,
    boundSetAuthorId,
    boundSetPostPreviewManuallyChanged,
    boundResetDraft,
  ] = useActions([
    setPostDirections,
    setPostOrigin,
    setPostTitle,
    setAuthorsName,
    setAuthorsDetails,
    setVideoUrl,
    setPostBody,
    setPostPreviewText,
    setAuthorId,
    setPostPreviewManuallyChanged,
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

  const handlePreviewChange = useCallback(
    _.debounce((value: string) => {
      boundSetPostPreviewText({
        postType: PostTypeEnum.VIDEO,
        value,
      });
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
    boundSetAuthorId({
      postType: PostTypeEnum.VIDEO,
      value,
    });
    setAuthor(item);
    setAuthors([]);
    setSearchValue(authorFullName);
  };

  const handlePreviewManuallyChanged = () => {
    boundSetPostPreviewManuallyChanged(PostTypeEnum.VIDEO);
  };

  const newPost: CreateVideoPostRequestType = {
    authorId: savedPostDraft.authorId,
    previewImageUrl: savedPostDraft.previewImageUrl,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origins: savedPostDraft.origins,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    authorsName: savedPostDraft.authorsName,
    authorsDetails: savedPostDraft.authorsDetails,
    videoUrl: savedPostDraft.videoUrl,
    type: { id: PostTypeEnum.VIDEO },
  };

  const previewPost = React.useMemo(
    () =>
      ({
        author: user.data,
        content: savedPostDraft.htmlContent,
        preview: savedPostDraft.preview.value,
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        directions: savedPostDraft.directions,
        origins: savedPostDraft.origins,
        title: savedPostDraft.title,
        videoUrl: savedPostDraft.videoUrl,
        type: { id: PostTypeEnum.VIDEO, name: t(langTokens.common.video) },
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    const response = await createPost(newPost);
    boundResetDraft(PostTypeEnum.VIDEO);
    history.push(`/posts/${response.data.id}`);
  };

  let extraFieldsForTranslation: ExtraFieldsType = null;

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
      <PageTitle title={pageTitle} />
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
            <Typography variant="h5">{titleInputLabel}</Typography>
            <TextField
              error={Boolean(title.error)}
              helperText={title.error}
              fullWidth
              required
              id="post-name"
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
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              />
            )}
          </Box>
          <BorderBottom />
          <Box mt={2}>
            <Typography variant="h5">{contentInputLabel}</Typography>
            <TextPostEditor
              toolbar={editorToolbar}
              initialHtmlContent={savedPostDraft.htmlContent}
              initialPreview={savedPostDraft.preview.value}
              onHtmlContentChange={(value) => {
                setTyping({ ...typing, content: true });
                handleHtmlContentChange(value);
              }}
              initialWasPreviewManuallyChanged={
                savedPostDraft.preview.isManuallyChanged
              }
              onPreviewManuallyChanged={handlePreviewManuallyChanged}
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
