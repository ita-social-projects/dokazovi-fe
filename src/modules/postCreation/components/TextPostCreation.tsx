import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
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
} from '../store/postCreationSlice';
import { IDirection, IPost, IOrigin, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PostCreationButtons } from './PostCreationButtons';
import { CreateTextPostRequestType } from '../../../lib/utilities/API/types';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
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

interface IPostCreationProps {
  pageTitle: string;
  titleInputLabel: string;
  contentInputLabel: string;
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
  const dispatch = useDispatch();

  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft[postType.type],
  );
  const { user } = useSelector((state: RootStateType) => state.currentUser);

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

  const handleDirectionsChange = (value: IDirection[]) => {
    dispatch(setPostDirections({ postType: postType.type, value }));
  };

  const handleOriginsChange = (value: IOrigin[]) => {
    setAuthName({ ...authorsName, value: '' });
    setAuthDetails({ ...authorsDetails, value: '' });
    dispatch(setPostOrigin({ postType: postType.type, value }));
  };

  const handleTitleChange = (value: string) => {
    dispatch(setPostTitle({ postType: postType.type, value }));
  };

  const handleAuthorsNameChange = (value: string) => {
    dispatch(setAuthorsName({ postType: postType.type, value }));
  };

  const handleAuthorsDetailsChange = (value: string) => {
    dispatch(setAuthorsDetails({ postType: postType.type, value }));
  };

  const dispatchImageUrl = (previewImageUrl: string): void => {
    dispatch(
      setImageUrl({
        postType: PostTypeEnum.ARTICLE,
        value: previewImageUrl,
      }),
    );
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostBody({
          postType: postType.type,
          value: sanitizeHtml(value),
        }),
      );
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewChange = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostPreviewText({
          postType: postType.type,
          value,
        }),
      );
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

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
    dispatch(setPostPreviewManuallyChanged(postType.type));
  };

  const newPost: CreateTextPostRequestType = {
    previewImageUrl: savedPostDraft.previewImageUrl,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    origin: savedPostDraft.origin,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    authorsName: savedPostDraft.authorsName,
    authorsDetails: savedPostDraft.authorsDetails,
    type: { id: postType.type },
  };

  const previewPost = React.useMemo(
    () =>
      ({
        author: user,
        content: savedPostDraft.htmlContent,
        preview: savedPostDraft.preview.value,
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        directions: savedPostDraft.directions,
        origin: savedPostDraft.origin,
        title: savedPostDraft.title,
        type: { id: postType.type, name: postType.name },
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    const response = await createPost(newPost);
    dispatch(resetDraft(postType.type));
    history.push(`/posts/${response.data.id}`);
  };

  let extraFieldsForTranslation: ExtraFieldsType = null;

  if (savedPostDraft.origin[0]) {
    if (savedPostDraft.origin[0].id === 3) {
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
            selectedOrigin={savedPostDraft.origin}
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
