import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
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
} from '../../../../models/postCreation';
import { IDirection, IPost, IOrigin, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PostCreationButtons } from './PostCreationButtons';
import {
  CreateTextPostRequestType,
  ExpertResponseType,
} from '../../../lib/utilities/API/types';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { createPost, getAllExperts } from '../../../lib/utilities/API/api';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';
import { TextPostEditor } from '../../../lib/components/Editor/Editors/TextPostEditor';
import { IEditorToolbarProps } from '../../../lib/components/Editor/types';
import { PostDirectionsSelector } from './PostDirectionsSelector';
import { PostOriginsSelector } from './PostOriginsSelector';
import { BorderBottom } from '../../../lib/components/Border';
import { getStringFromFile } from '../../../lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../../lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../../lib/components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { PostAuthorSelection } from './PostAuthorSelection/PostAuthorSelection';

import { selectCurrentUser } from '../../../../models/user/selectors';
import { selectTextPostDraft } from '../../../../models/postCreation/selectors';
import { useActions } from '../../../../shared/hooks';

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
    boundSetAuthorId({
      postType: postType.type,
      value,
    });
    setAuthor(item);
    setAuthors([]);
    setSearchValue('');
  };

  const fileSelectorHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    getStringFromFile(e.target.files)
      .then((str) => uploadImageToImgur(str))
      .then((res) => {
        if (res.data.status === 200) {
          dispatchImageUrl(res.data.data.link);
        }
      });
  };

  const handlePreviewManuallyChanged = () => {
    boundSetPostPreviewManuallyChanged(postType.type);
  };

  const newPost: CreateTextPostRequestType = {
    authorId: savedPostDraft.authorId,
    previewImageUrl: savedPostDraft.previewImageUrl,
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
    // console.log(newPost);
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
            <Typography variant="h5">Ім`я автора</Typography>
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
            <Typography variant="h5">Детальна інформація про автора</Typography>
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
            selectedOrigin={savedPostDraft.origins}
            onSelectedOriginChange={handleOriginsChange}
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
            fileSelectorHandler={fileSelectorHandler}
            newPost={newPost}
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
