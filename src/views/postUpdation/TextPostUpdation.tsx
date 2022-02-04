import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropEvent, FileRejection } from 'react-dropzone';
import { PageTitle } from 'components/Page/PageTitle';
import { useSelector } from 'react-redux';
import { CarouselImagesWrapper } from 'views/postCreation/CarouselImagesWrapper';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { getAllExperts, updatePost } from '../../old/lib/utilities/API/api';
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
import PostView from '../../old/modules/posts/components/PostView';
import { TextPostEditor } from '../../components/Editor/Editors/TextPostEditor';
import { IEditorToolbarProps } from '../../components/Editor/types';
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

export interface ITextPostUpdationProps {
  pageTitle: string;
  titleInputLabel: string;
  contentInputLabel: string;
  editorToolbar: React.ComponentType<IEditorToolbarProps>;
  post: IPost;
}

export const TextPostUpdation: React.FC<ITextPostUpdationProps> = ({
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
  const [autoChanges, setAutoChanges] = useState(true);

  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [selectedOrigins, setSelectedOrigins] = useState<IOrigin[]>(
    post.origins,
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
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
  };

  const contentText = updatedPost.content.replace(CLEAR_HTML_REG_EXP, '');

  const isEmpty =
    !updatedPost.title ||
    !updatedPost.content ||
    !updatedPost.directions.length ||
    !updatedPost.authorId;

  const isEnoughLength =
    contentText.length <= MIN_CONTENT_LENGTH ||
    updatedPost.title.length <= MIN_TITLE_LENGTH ||
    updatedPost.preview.length <= MIN_PREVIEW_LENGTH;

  const isTooLong = updatedPost.title.length > MAX_TITLE_LENGTH;

  const hasBackGroundImg =
    !!updatedPost?.origins?.length &&
    updatedPost?.origins[0]?.id !== 1 &&
    !updatedPost.previewImageUrl;

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
  };

  const handlePublishClick = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
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
              id="post-name"
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
          {isAdmin && (
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
              <BorderBottom />
            </>
          )}
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
        isModal={{ isEmpty, isEnoughLength, isTooLong, hasBackGroundImg }}
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
