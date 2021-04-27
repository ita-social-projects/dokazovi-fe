import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import {
  setPostDirections,
  setPostTitle,
  setPostBody,
  setImageUrl,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  resetDraft,
} from '../store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../../lib/types';
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
import { BorderBottom } from '../../../lib/components/Border';
import { getStringFromFile } from '../../../lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../../lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../../lib/components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';

import { selectCurrentUser } from '../../../store/user/selectors';

interface IPostCreationProps {
  pageTitle: string;
  titleInputLabel: string;
  contentInputLabel: string;
  postType: { type: PostTypeEnum; name: string };
  editorToolbar: React.ComponentType<IEditorToolbarProps>;
}

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
  const user = useSelector(selectCurrentUser);

  const [title, setTitle] = useState({
    value: savedPostDraft.title,
    error: '',
  });

  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);

  const handleDirectionsChange = (value: IDirection[]) => {
    dispatch(setPostDirections({ postType: postType.type, value }));
  };

  const handleTitleChange = (value: string) => {
    dispatch(setPostTitle({ postType: postType.type, value }));
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
          console.log(res);
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
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
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

  return (
    <>
      <PageTitle title={pageTitle} />
      {!previewing ? (
        <>
          <PostDirectionsSelector
            selectedDirections={savedPostDraft.directions}
            onSelectedDirectionsChange={handleDirectionsChange}
          />
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
