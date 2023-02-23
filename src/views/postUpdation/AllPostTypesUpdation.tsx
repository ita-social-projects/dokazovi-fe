import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropEvent, FileRejection } from 'react-dropzone';
import { PageTitle } from 'components/Page/PageTitle';
import {
  AuthorListDropdown,
  PageSizeType,
} from 'views/Profile/AuthorsList/AuthorListDropdown';
import { useSelector } from 'react-redux';
import { CarouselImagesWrapper } from 'views/postCreation/CarouselImagesWrapper';
import { StatusesForActions } from 'models/adminLab/types';
import { setChangesSize, selectSize } from 'models/changeLog';
import { useActions } from 'shared/hooks';
import { Pagination } from '@material-ui/lab';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import {
  fetchChangeLog,
  getAllExperts,
  updatePost,
} from '../../old/lib/utilities/API/api';
import { IDirection, IOrigin, IPost } from '../../old/lib/types';
import { PostCreationButtons } from '../postCreation/PostCreationButtons';
import {
  ExpertResponseType,
  UpdateTextPostRequestType,
} from '../../old/lib/utilities/API/types';
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
import VideoUrlInputModal from '../../components/Editor/CustomModules/VideoUrlInputModal';
import { parseVideoIdFromUrl } from '../../old/lib/utilities/parseVideoIdFromUrl';
import PostView from '../../old/modules/posts/components/PostView';
import { TextPostEditor } from '../../components/Editor/Editors/TextPostEditor';
import { PostDirectionsSelector } from '../postCreation/PostDirectionsSelector';
import { PostOriginsSelector } from '../postCreation/PostOriginsSelector';
import { PostAuthorSelection } from '../postCreation/PostAuthorSelection/PostAuthorSelection';
import { BorderBottom } from '../../old/lib/components/Border';
import { getStringFromFile } from '../../old/lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../old/lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from '../postCreation/RequiredFieldsStyle';
import { selectAuthorities } from '../../models/authorities';

export interface IAllPostTypesUpdation {
  pageTitle: string;
  titleInputLabel: string;
  contentInputLabel: string;
  post: IPost;
}

export const AllPostTypesUpdation: React.FC<IAllPostTypesUpdation> = ({
  pageTitle,
  titleInputLabel,
  contentInputLabel,
  post,
}) => {
  const history = useHistory();
  const classes = useStyle();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');
  const [autoChanges, setAutoChanges] = useState(true);
  const isVideoPost = post.type.id === 2;

  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [selectedOrigins, setSelectedOrigins] = useState<IOrigin[]>(
    post.origins,
  );

  const [previewImageUrl, setPreviewImageUrl] = useState(
    post.previewImageUrl ?? '',
  );
  const [importantImageUrl, setImportantImageUrl] = useState<string>(
    post.importantImageUrl ?? '',
  );
  const [importantMobileImageUrl, setImportantMobileImageUrl] = useState<
    string
  >(post.importantMobileImageUrl ?? '');
  const [preview, setPreview] = useState(post.preview);
  const [title, setTitle] = useState({
    value: post.title,
    error: '',
  });
  const [videoUrl, setVideoUrl] = useState<string>(post.videoUrl as string);

  const [htmlContent, setHtmlContent] = useState<string>(post.content);

  const [authors, setAuthors] = useState<ExpertResponseType[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [author, setAuthor] = useState<ExpertResponseType>();
  const [searchValue, setSearchValue] = useState(
    `${post.author.firstName} ${post.author.lastName}`,
  );
  const [authorLength, setAuthorLength] = useState<number | null>(null);
  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);
  const [isDisplayTable, setIsDisplayTable] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const postCurrentState = {
    title: title.value,
    htmlContent: htmlContent
      .replaceAll(CLEAR_HTML_REG_EXP, '')
      .replace(/  +/g, ' '),
    preview,
    selectedDirections,
    selectedOrigins,
    previewImageUrl,
    importantImageUrl,
    importantMobileImageUrl,
    videoUrl,
  };

  const postInitialState = useRef({
    title: post.title,
    htmlContent: post.content
      .replaceAll(CLEAR_HTML_REG_EXP, '')
      .replace(/  +/g, ' '),
    preview: post.preview,
    selectedDirections: post.directions,
    selectedOrigins: post.origins,
    previewImageUrl: post.previewImageUrl,
    importantImageUrl: post.importantImageUrl,
    importantMobileImageUrl: post.importantMobileImageUrl,
    videoUrl: post.videoUrl,
  });

  useEffect(() => {
    if (
      JSON.stringify(postInitialState.current) !==
      JSON.stringify(postCurrentState)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    title,
    htmlContent,
    preview,
    selectedDirections,
    selectedOrigins,
    previewImageUrl,
    importantImageUrl,
    importantMobileImageUrl,
    videoUrl,
  ]);

  const { t } = useTranslation();

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
    setIsDisplayTable(true);
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
    setAuthorId(value);
    setAuthor(item);
    setAuthors([]);
    setSearchValue(authorFullName);
  };

  const fileSelectorHandler = (
    dispatchFunc: (arg: string) => void,
  ): (<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void) => (files) => {
    getStringFromFile(files)
      .then((str) => uploadImageToImgur(str))
      .then((res) => {
        if (res.data.status === 200) {
          dispatchFunc(res.data.data.link);
        }
      });
  };

  const videoId = parseVideoIdFromUrl(videoUrl);

  const updatedPost: UpdateTextPostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    origins: selectedOrigins,
    preview,
    previewImageUrl,
    importantImageUrl,
    importantMobileImageUrl,
    title: title.value,
    type: post.type,
    authorId: authorId ?? post.author.id,
    videoUrl,
  };

  const contentText = updatedPost.content.replace(CLEAR_HTML_REG_EXP, '');

  const isEmpty =
    !updatedPost.title ||
    !updatedPost.content ||
    !updatedPost.directions.length ||
    !updatedPost.authorId ||
    !updatedPost.preview;

  const isEnoughLength =
    contentText.length <= MIN_CONTENT_LENGTH ||
    updatedPost.title.length <= MIN_TITLE_LENGTH ||
    updatedPost.preview.length <= MIN_PREVIEW_LENGTH;

  const isTooLong = updatedPost.title.length > MAX_TITLE_LENGTH;

  const hasBackGroundImg =
    !!updatedPost?.origins?.length &&
    updatedPost?.origins[0]?.id !== 1 &&
    !updatedPost.previewImageUrl;

  const isVideoEmpty = isVideoPost ? !updatedPost.videoUrl : false;

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
    previewImageUrl,
    importantImageUrl,
    importantMobileImageUrl,
    directions: selectedDirections,
    origins: selectedOrigins,
    title: title.value,
    type: post.type,
    videoUrl,
  };

  const handlePublishClick = async () => {
    updatedPost.postStatus = isAdmin
      ? StatusesForActions.PUBLISHED
      : StatusesForActions.MODERATION_SECOND_SIGN;
    await updatePost(updatedPost);
    history.push(`/posts/${updatedPost.id}`);
  };

  const handleSaveClick = async () => {
    if (post.status !== undefined) {
      updatedPost.postStatus = StatusesForActions[post.status] as number;
    } else {
      updatedPost.postStatus = 0;
    }
    await updatePost(updatedPost);
    history.push(`/posts/${updatedPost.id}`);
  };

  const postOriginSelector = isAdmin && (
    <PostOriginsSelector
      selectedOrigins={selectedOrigins}
      onSelectedOriginsChange={handleOriginsChange}
    />
  );

  const postAuthorSelection = isAdmin && (
    <PostAuthorSelection
      isDisplayTable={isDisplayTable}
      onAuthorTableClick={onAuthorTableClick}
      handleOnChange={handleOnChange}
      authors={authors}
      searchValue={searchValue}
      authorsLength={authorLength}
    />
  );

  type ContentChangesType = {
    id: number;
    title: string;
    changes: string;
    dateOfChange: Date;
  };
  const changesPerPage: PageSizeType = [10, 20, 50, 'All'];

  const [changes, setChanges] = useState<ContentChangesType[]>([]);
  const [setSizePerPage] = useActions([setChangesSize]);
  const size = useSelector(selectSize);
  const handleNotesToShowChange = (val) => {
    setSizePerPage(val);
  };

  useEffect(() => {
    const changedMaterials = async () => {
      if (typeof size === 'string') {
        const { data } = await fetchChangeLog();
        return setChanges(data.content);
      }
      const { data } = await fetchChangeLog({ size });
      return setChanges(data.content);
    };
    changedMaterials();
  }, [size]);

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
              id={isVideoPost ? 'video-name' : 'post-name'}
              value={title.value}
              inputProps={{
                'data-testid': 'text-field',
              }}
              onChange={(e) => {
                setTitle({ ...title, value: e.target.value });
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
                    dispatchImageUrl={setPreviewImageUrl}
                    fileSelectorHandler={fileSelectorHandler(
                      setPreviewImageUrl,
                    )}
                    title={t(langTokens.editor.backgroundImage)}
                    imgUrl={previewPost?.previewImageUrl}
                    reminder
                    forMobilePic={false}
                  />
                </Box>
              </Box>
              <BorderBottom />
              <CarouselImagesWrapper
                post={previewPost}
                setImportantImageUrl={setImportantImageUrl}
                setImportantMobileImageUrl={setImportantMobileImageUrl}
              />
            </>
          )}
          {isVideoPost && (
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
          )}
          <BorderBottom />
          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {contentInputLabel}
            </Typography>
            <TextPostEditor
              isVideoPost={isVideoPost}
              initialHtmlContent={htmlContent}
              initialPreview={preview}
              onHtmlContentChange={(value) => {
                setTyping({ ...typing, content: true });
                handleHtmlContentChange(value);
                if (!htmlContent.replace(CLEAR_HTML_REG_EXP, '').length) {
                  setAutoChanges(false);
                }
              }}
              initialWasPreviewManuallyChanged={autoChanges}
              disableAutoChanges={() => setAutoChanges(true)}
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
        action="updating"
        isAdmin={isAdmin}
        isModal={{
          isEmpty,
          isEnoughLength,
          isVideoEmpty,
          isTooLong,
          hasBackGroundImg,
        }}
        onCancelClick={() => {
          history.goBack();
        }}
        onPublishClick={handlePublishClick}
        onSaveClick={handleSaveClick}
        onPreviewClick={() => {
          setPreviewing(!previewing);
        }}
        previewing={previewing}
        disabled={isDisabled}
        post={post}
      />
      <BorderBottom />
      <Typography component="h2" variant="h2">
        {t(langTokens.admin.changesList)}
      </Typography>
      <Box mt={3}>
        <AuthorListDropdown
          pageSizes={changesPerPage || 'All'}
          setChanges={handleNotesToShowChange}
          selected={size || 'All'}
        />
        <List>
          {changes.map((item) => {
            return (
              <ListItem key={item.id}>
                <Typography variant="h6" component="h2">
                  {item.title} {item.changes}:{' '}
                  {new Date(item.dateOfChange).toUTCString()}
                </Typography>
              </ListItem>
            );
          })}
          {changes.length === 0 && (
            <Typography component="h2" variant="h2">
              {t(langTokens.admin.noChangesLog)}
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};
