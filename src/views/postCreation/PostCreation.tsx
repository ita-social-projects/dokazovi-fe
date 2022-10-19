import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageTitle } from 'components/Page/PageTitle';
import { StatusesForActions } from 'models/adminLab/types';
import { RootStateType } from '../../models/rootReducer';
import {
  resetDraft,
  setAuthorId,
  setAuthorsDetails,
  setAuthorsName,
  setImageUrl,
  setImportantImageUrl,
  setImportantMobileImageUrl,
  setPostBody,
  setPostDirections,
  setPostOrigin,
  setPostPreviewManuallyChanged,
  setPostPreviewText,
  setPostTitle,
  selectVideoUrl,
  setVideoUrl,
} from '../../models/postCreation';
import { IDirection, IOrigin, IPost, PostTypeEnum } from '../../old/lib/types';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { parseVideoIdFromUrl } from '../../old/lib/utilities/parseVideoIdFromUrl';
import VideoUrlInputModal from '../../components/Editor/CustomModules/VideoUrlInputModal';
import { PostCreationButtons } from './PostCreationButtons';
import {
  ExpertResponseType,
  CreatePostRequestType,
} from '../../old/lib/utilities/API/types';
import { createPost, getAllExperts } from '../../old/lib/utilities/API/api';
import {
  CLEAR_HTML_REG_EXP,
  CONTENT_DEBOUNCE_TIMEOUT,
  FIND_AUTHORS_DEBOUNCE_TIMEOUT,
  MAX_TITLE_LENGTH,
  MIN_CONTENT_LENGTH,
  MIN_PREVIEW_LENGTH,
  MIN_TITLE_LENGTH,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../old/lib/constants/editors';
import PostView from '../../old/modules/posts/components/PostView';
import { CarouselImagesWrapper } from './CarouselImagesWrapper';
import { TextPostEditor } from '../../components/Editor/Editors/TextPostEditor';
import { PostDirectionsSelector } from './PostDirectionsSelector';
import { PostOriginsSelector } from './PostOriginsSelector';
import { BorderBottom } from '../../old/lib/components/Border';
import { fileSelectorHandler } from './fileSelectorHandler';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { PostAuthorSelection } from './PostAuthorSelection/PostAuthorSelection';
import { selectCurrentUser } from '../../models/user';
import { selectPostDraft } from '../../models/postCreation/selectors';
import { useActions } from '../../shared/hooks';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from './RequiredFieldsStyle';
import { selectAuthorities } from '../../models/authorities';

interface IPostCreationProps {
  pageTitle?: string;
  titleInputLabel?: string;
  contentInputLabel?: string;
  postType: { type: PostTypeEnum; name: string };
}

type ExtraFieldsType = null | JSX.Element;

export const PostCreation: React.FC<IPostCreationProps> = ({
  pageTitle,
  titleInputLabel,
  contentInputLabel,
  postType,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyle();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');
  const isVideoPost = postType.type === PostTypeEnum.VIDEO;

  const savedPostDraft = useSelector((state: RootStateType) =>
    selectPostDraft(state, postType.type),
  );
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
  const [, setAuthor] = useState<ExpertResponseType | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [authorLength, setAuthorLength] = useState<number | null>(null);

  const videoUrl = useSelector(selectVideoUrl);

  const videoId = parseVideoIdFromUrl(videoUrl);

  const [
    boundSetPostDirections,
    boundSetPostOrigin,
    boundSetPostTitle,
    boundSetAuthorsName,
    boundSetAuthorsDetails,
    boundSetImageUrl,
    boundSetPostBody,
    boundSetPostPreviewText,
    boundSetAuthorId,
    boundSetPostPreviewManuallyChanged,
    boundResetDraft,
    boundSetImportantImageUrl,
    boundSetImportantMobileImageUrl,
    boundSetVideoUrl,
  ] = useActions([
    setPostDirections,
    setPostOrigin,
    setPostTitle,
    setAuthorsName,
    setAuthorsDetails,
    setImageUrl,
    setPostBody,
    setPostPreviewText,
    setAuthorId,
    setPostPreviewManuallyChanged,
    resetDraft,
    setImportantImageUrl,
    setImportantMobileImageUrl,
    setVideoUrl,
  ]);

  const handleDirectionsChange = (value: IDirection[]) => {
    boundSetPostDirections({ postType: postType.type, value });
  };

  const handleOriginsChange = (value: IOrigin[]) => {
    setAuthName({ ...authorsName, value: '' });
    setAuthDetails({ ...authorsDetails, value: '' });
    boundSetPostOrigin({ postType: postType.type, value });
  };

  const handleTitleChange = (value: string) => {
    boundSetPostTitle({ postType: postType.type, value });
  };

  const handleAuthorsNameChange = (value: string) => {
    boundSetAuthorsName({ postType: postType.type, value });
  };

  const handleAuthorsDetailsChange = (value: string) => {
    boundSetAuthorsDetails({ postType: postType.type, value });
  };

  const handleVideoUrlChange = (url: string) => {
    boundSetVideoUrl(url);
  };

  const dispatchImageUrl = (previewImageUrl: string): void => {
    boundSetImageUrl({
      postType: PostTypeEnum.ARTICLE,
      value: previewImageUrl,
    });
  };

  const dispatchImportantImageUrl = (previewImageUrl: string): void => {
    boundSetImportantImageUrl({
      postType: PostTypeEnum.ARTICLE,
      value: previewImageUrl,
    });
  };

  const dispatchImportantMobileImageUrl = (previewImageUrl: string): void => {
    boundSetImportantMobileImageUrl({
      postType: PostTypeEnum.ARTICLE,
      value: previewImageUrl,
    });
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      boundSetPostBody({
        postType: postType.type,
        value: sanitizeHtml(value),
      });
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewChange = useCallback(
    _.debounce((value: string) => {
      boundSetPostPreviewText({
        postType: postType.type,
        value,
      });
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const handleOnChange = (value: string) => {
    setSearchValue(value);
  };

  const debouncedGetAllExperts = useCallback(
    _.debounce((val: string) => {
      if (!val) {
        setAuthors([]);
        return;
      }
      getAllExperts({ params: { userName: val.trim() } }).then((res) => {
        setAuthors(res.data.content);
        setAuthorLength(res.data.totalElements);
      });
    }, FIND_AUTHORS_DEBOUNCE_TIMEOUT),
    [],
  );

  useEffect(() => {
    debouncedGetAllExperts(searchValue);
  }, [searchValue]);

  const onAuthorTableClick = (value: number, item: ExpertResponseType) => {
    const authorFullName = `${item.firstName} ${item.lastName}`;
    boundSetAuthorId({
      postType: postType.type,
      value,
    });
    setAuthor(item);
    setAuthors([]);
    setSearchValue(authorFullName);
  };

  const handlePreviewManuallyChanged = () => {
    boundSetPostPreviewManuallyChanged(postType.type);
  };

  const newPost: CreatePostRequestType = {
    authorId: isAdmin ? savedPostDraft.authorId : user.data?.id,
    previewImageUrl: savedPostDraft.previewImageUrl || '',
    importantImageUrl: savedPostDraft.importantImageUrl || '',
    importantMobileImageUrl: savedPostDraft.importantMobileImageUrl || '',
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origins: savedPostDraft.origins,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    authorsName: savedPostDraft.authorsName,
    authorsDetails: savedPostDraft.authorsDetails,
    videoUrl: savedPostDraft.videoUrl,
    type: { id: postType.type },
  };

  const contentText = newPost.content.replaceAll(CLEAR_HTML_REG_EXP, '');

  const isEmpty =
    !newPost.title ||
    !newPost.directions.length ||
    !newPost.content ||
    !newPost.authorId ||
    !newPost.preview;

  const isEnoughLength =
    contentText.length <= MIN_CONTENT_LENGTH ||
    newPost.title.length <= MIN_TITLE_LENGTH ||
    newPost.preview.length <= MIN_PREVIEW_LENGTH;

  const hasBackGroundImg =
    !!newPost?.origins?.length &&
    newPost?.origins[0]?.id !== 1 &&
    !newPost.previewImageUrl;

  const isVideoEmpty = isVideoPost ? !newPost.videoUrl : false;

  const isTooLong = newPost.title.length > MAX_TITLE_LENGTH;
  let postId: number;

  const previewPost = React.useMemo(
    () =>
      ({
        id: postId,
        author: user.data,
        content: savedPostDraft.htmlContent,
        preview: savedPostDraft.preview.value,
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        previewImageUrl: savedPostDraft.previewImageUrl,
        publishedAt: '',
        directions: savedPostDraft.directions,
        origins: savedPostDraft.origins,
        title: savedPostDraft.title,
        videoUrl: savedPostDraft.videoUrl,
        type: { id: postType.type, name: postType.name },
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    newPost.postStatus = isAdmin
      ? StatusesForActions.PUBLISHED
      : StatusesForActions.MODERATION_SECOND_SIGN;
    const response = await createPost(newPost);
    boundResetDraft(postType.type);
    postId = response.data.id;
    history.push(`/posts/${postId}`);
  };

  const handleSaveClick = async () => {
    newPost.postStatus = StatusesForActions.DRAFT;
    const response = await createPost(newPost);
    postId = response.data.id;
    history.push(`/posts/${postId}`);
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

  const postOriginSelector = isAdmin && (
    <PostOriginsSelector
      selectedOrigins={savedPostDraft.origins}
      onSelectedOriginsChange={handleOriginsChange}
    />
  );

  const postAuthorSelection = isAdmin && (
    <PostAuthorSelection
      isDisplayTable
      onAuthorTableClick={onAuthorTableClick}
      handleOnChange={handleOnChange}
      authors={authors}
      searchValue={searchValue}
      authorsLength={authorLength}
    />
  );

  return (
    <>
      <PageTitle title={pageTitle} />
      {!previewing ? (
        <>
          <PostDirectionsSelector
            selectedDirections={savedPostDraft.directions}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
          {postOriginSelector}
          {extraFieldsForTranslation}
          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {titleInputLabel}
            </Typography>
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
            {title.value.length > MAX_TITLE_LENGTH && (
              <div style={{ color: 'red' }}>
                {t(langTokens.editor.toMuchTitleLength)}
              </div>
            )}
          </Box>

          {postAuthorSelection}

          {isAdmin && !isVideoPost && (
            <>
              <Box className={classes.backgroundImagesContainer}>
                <Box className={classes.backgroundImageWrapper}>
                  <BackgroundImageContainer
                    dispatchImageUrl={dispatchImageUrl}
                    fileSelectorHandler={fileSelectorHandler(dispatchImageUrl)}
                    title={t(langTokens.editor.backgroundImage)}
                    imgUrl={newPost?.previewImageUrl}
                    reminder
                    forMobilePic={false}
                  />
                </Box>
              </Box>
              <BorderBottom />
              <CarouselImagesWrapper
                post={newPost}
                setImportantImageUrl={dispatchImportantImageUrl}
                setImportantMobileImageUrl={dispatchImportantMobileImageUrl}
              />
            </>
          )}

          {isVideoPost && (
            <>
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
            </>
          )}

          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {contentInputLabel}
            </Typography>
            <TextPostEditor
              isVideoPost={isVideoPost}
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
        <PostView isPreview post={previewPost} />
      )}

      <PostCreationButtons
        action="creating"
        isModal={{
          isEmpty,
          isEnoughLength,
          isVideoEmpty,
          isTooLong,
          hasBackGroundImg,
        }}
        onPublishClick={handlePublishClick}
        onSaveClick={handleSaveClick}
        onPreviewClick={() => {
          setPreviewing(!previewing);
        }}
        previewing={previewing}
      />
    </>
  );
};
