import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropEvent, FileRejection } from 'react-dropzone';
import { PageTitle } from 'components/Page/PageTitle';
import { useSelector } from 'react-redux';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { updatePost, getAllExperts } from '../../old/lib/utilities/API/api';
import { IDirection, IPost, IOrigin } from '../../old/lib/types';
import { PostCreationButtons } from '../postCreation/PostCreationButtons';
import {
  UpdateTextPostRequestType,
  ExpertResponseType,
} from '../../old/lib/utilities/API/types';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
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
  const [importantImageUrl, setImportantImageUrl] = useState(
    post.importantImageUrl ?? '',
  );
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
    title: title.value,
    type: post.type,
    authorId: authorId ?? post.author.id,
  };

  const regExp = /^[а-яєїіґ]*\d*\s*\W*$/i;

  const isEmpty =
    !updatedPost.title ||
    !updatedPost.content ||
    !updatedPost.directions.length;

  const isEnoughLength =
    updatedPost.content.length < 15 || updatedPost.title.length < 10;

  const isHasUASymbols = !regExp.test(
    updatedPost.title
  );

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
      onAuthorTableClick={onAuthorTableClick}
      handleOnChange={handleOnChange}
      authors={authors}
      searchValue={searchValue}
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
              onChange={(e) => {
                setTitle({ ...title, value: e.target.value });
              }}
            />
          </Box>
          {postAuthorSelection}
          <BackgroundImageContainer
            dispatchImageUrl={setPreviewImageUrl}
            fileSelectorHandler={fileSelectorHandler(setPreviewImageUrl)}
            title={t(langTokens.editor.backgroundImage)}
            imgUrl={previewPost?.previewImageUrl}
          />
          <BorderBottom />
          <BackgroundImageContainer
            dispatchImageUrl={setImportantImageUrl}
            fileSelectorHandler={fileSelectorHandler(setImportantImageUrl)}
            title={t(langTokens.editor.carouselImage)}
            imgUrl={previewPost?.importantImageUrl}
            notCarousel={false}
          />
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
        isModal={{ isEmpty, isEnoughLength, isHasUASymbols }}
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
