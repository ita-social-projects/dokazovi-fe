import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DropEvent, FileRejection } from 'react-dropzone';
import { PageTitle } from 'components/Page/PageTitle';
import { RootStateType } from '../../models/rootReducer';
import {
  resetDraft,
  setAuthorId,
  setAuthorsDetails,
  setAuthorsName,
  setImageUrl,
  setImportantImageUrl,
  setPostBody,
  setPostDirections,
  setPostOrigin,
  setPostPreviewManuallyChanged,
  setPostPreviewText,
  setPostTitle,
} from '../../models/postCreation';
import { IDirection, IOrigin, IPost, PostTypeEnum } from '../../old/lib/types';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { PostCreationButtons } from './PostCreationButtons';
import {
  CreateTextPostRequestType,
  ExpertResponseType,
} from '../../old/lib/utilities/API/types';
import { createPost, getAllExperts } from '../../old/lib/utilities/API/api';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../old/lib/constants/editors';
import PostView from '../../old/modules/posts/components/PostView';
import { TextPostEditor } from '../../components/Editor/Editors/TextPostEditor';
import { IEditorToolbarProps } from '../../components/Editor/types';
import { PostDirectionsSelector } from './PostDirectionsSelector';
import { PostOriginsSelector } from './PostOriginsSelector';
import { BorderBottom } from '../../old/lib/components/Border';
import { getStringFromFile } from '../../old/lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../old/lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { PostAuthorSelection } from './PostAuthorSelection/PostAuthorSelection';
import { selectCurrentUser } from '../../models/user';
import { selectTextPostDraft } from '../../models/postCreation/selectors';
import { useActions } from '../../shared/hooks';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from './RequiredFieldsStyle';
import { selectAuthorities } from '../../models/authorities';

interface IPostCreationProps {
  pageTitle?: string;
  titleInputLabel?: string;
  contentInputLabel?: string;
  postType: { type: PostTypeEnum; name: string };
  editorToolbar: React.ComponentType<IEditorToolbarProps>;
}

type ExtraFieldsType = null | JSX.Element;

export const TextPostCreation: React.FC<IPostCreationProps> = ({
  pageTitle,
  titleInputLabel,
  contentInputLabel,
  postType,
  editorToolbar,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyle();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  const savedPostDraft = useSelector((state: RootStateType) =>
    selectTextPostDraft(state, postType.type),
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

  useEffect(() => {
    if (!searchValue) {
      setAuthors([]);
      return;
    }
    getAllExperts({ params: { userName: searchValue.trim() } })
      .then((res) => {
        setAuthors(res.data.content);
      })
      .catch((e) => {
        console.error(e);
      });
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

  const handlePreviewManuallyChanged = () => {
    boundSetPostPreviewManuallyChanged(postType.type);
  };

  const newPost: CreateTextPostRequestType = {
    authorId: isAdmin ? savedPostDraft.authorId : user.data?.id,
    previewImageUrl: savedPostDraft.previewImageUrl,
    importantImageUrl: savedPostDraft.importantImageUrl,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origins: savedPostDraft.origins,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    authorsName: isAdmin ? savedPostDraft.authorsName : user.data?.firstName,
    authorsDetails: savedPostDraft.authorsDetails,
    type: { id: postType.type },
  };

  const regExp = /^[а-яєїіґ]*\d*\s*\W*$/i;

  const contentText = newPost.content.replaceAll(/<\/?[^>]+(>|$)/g, ' ');

  const isEmpty =
    !newPost.title || !newPost.directions.length || !newPost.content;

  const isEnoughLength =
    contentText.length < 17 || newPost.title.length < 10;

  const isHasUASymbols = !regExp.test(newPost.title) ||
    !regExp.test(contentText);

  const previewPost = React.useMemo(
    () =>
      ({
        author: user.data,
        content: savedPostDraft.htmlContent,
        preview: savedPostDraft.preview.value,
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        publishedAt: '',
        directions: savedPostDraft.directions,
        origins: savedPostDraft.origins,
        title: savedPostDraft.title,
        type: { id: postType.type, name: postType.name },
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    const response = await createPost(newPost);
    boundResetDraft(postType.type);
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

  const postOriginSelector = isAdmin && (
    <PostOriginsSelector
      selectedOrigins={savedPostDraft.origins}
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
          </Box>
          {postAuthorSelection}
          <BackgroundImageContainer
            dispatchImageUrl={dispatchImageUrl}
            fileSelectorHandler={fileSelectorHandler(dispatchImageUrl)}
            title={t(langTokens.editor.backgroundImage)}
            imgUrl={newPost?.previewImageUrl}
          />
          <BorderBottom />
          <BackgroundImageContainer
            dispatchImageUrl={dispatchImportantImageUrl}
            fileSelectorHandler={fileSelectorHandler(dispatchImportantImageUrl)}
            title={t(langTokens.editor.carouselImage)}
            imgUrl={newPost?.importantImageUrl}
            notCarousel={false}
          />
          <BorderBottom />
          <Box mt={2}>
            <Typography className={classes.requiredField} variant="h5">
              {contentInputLabel}
            </Typography>
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
        isModal={{ isEmpty, isEnoughLength, isHasUASymbols }}
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
