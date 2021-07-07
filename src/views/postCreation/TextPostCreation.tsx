import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { RootStateType } from '../../models/rootReducer';
import {
  setPostDirections,
  setPostOrigin,
  setPostTitle,
  setAuthorsName,
  setAuthorsDetails,
  setPostBody,
  setImageUrl,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  resetDraft,
  setAuthorId,
  setImportantImageUrl,
} from '../../models/postCreation';
import { IDirection, IPost, IOrigin, PostTypeEnum } from '../../old/lib/types';
import { sanitizeHtml } from '../../old/lib/utilities/sanitizeHtml';
import { PostCreationButtons } from './PostCreationButtons';
import {
  CreateTextPostRequestType,
  ExpertResponseType,
} from '../../old/lib/utilities/API/types';
import { PageTitle } from '../../old/lib/components/Pages/PageTitle';
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
import {
  getImgurImageLimits,
  uploadImageToImgur,
} from '../../old/lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { PostAuthorSelection } from './PostAuthorSelection/PostAuthorSelection';

import { selectCurrentUser } from '../../models/user/selectors';
import { selectTextPostDraft } from '../../models/postCreation/selectors';
import { useActions } from '../../shared/hooks';
import { langTokens } from '../../locales/localizationInit';

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
  const [author, setAuthor] = useState<ExpertResponseType | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [previewFiles, setPreviewFiles] = useState<FileList | null>(null);
  const [importantFiles, setImportantFiles] = useState<FileList | null>(null);

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
    getAllExperts({ params: { userName: searchValue.trim() } }).then((res) => {
      setAuthors(res.data.content);
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
    e: React.ChangeEvent<HTMLInputElement>,
    dispatchFunc: (arg: string) => void,
  ): void => {
    switch (e.target.name) {
      case 'previewImg':
        setPreviewFiles(e.target.files);
        break;
      case 'importantImg':
        setImportantFiles(e.target.files);
        break;
    }
    getStringFromFile(e.target.files)
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
    authorId: savedPostDraft.authorId,
    previewImageUrl: savedPostDraft.previewImageUrl,
    importantImageUrl: savedPostDraft.importantImageUrl,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origins: savedPostDraft.origins,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    authorsName: savedPostDraft.authorsName,
    authorsDetails: savedPostDraft.authorsDetails,
    type: { id: postType.type },
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
          <BackgroundImageContainer
            dispatchImageUrl={dispatchImageUrl}
            fileSelectorHandler={(e) =>
              fileSelectorHandler(e, dispatchImageUrl)
            }
            title={t(langTokens.editor.backgroundImage)}
            imgUrl={newPost?.previewImageUrl}
            files={previewFiles}
            name={'previewImg'}
            handleDelete={setPreviewFiles}
          />
          <BorderBottom />
          <BackgroundImageContainer
            dispatchImageUrl={dispatchImportantImageUrl}
            fileSelectorHandler={(e) =>
              fileSelectorHandler(e, dispatchImportantImageUrl)
            }
            title={t(langTokens.editor.carouselImage)}
            imgUrl={newPost?.importantImageUrl}
            files={importantFiles}
            name={'importantImg'}
            handleDelete={setImportantFiles}
          />
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
