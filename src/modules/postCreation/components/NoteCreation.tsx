import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  CircularProgress,
  Typography,
  Box,
  TextField,
} from '@material-ui/core';
import NoteEditor from '../../../lib/components/Editor/Editors/NoteEditor';
import {
  setPostBody,
  setIsDone,
  setPostTitle,
  setPostDirections,
  setPostPreviewManuallyChanged,
  setPostPreviewText,
} from '../store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CreateDopysPostRequestType } from '../../../lib/utilities/API/types';
import { PostPreviewLocationStateType } from './PostPreviewWrapper';

const NoteCreation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS,
  );
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const [title, setTitle] = useState({
    value: savedPostDraft.title,
    error: '',
  });

  const dispatchTitle = useCallback(
    _.debounce((value: string) => {
      dispatch(setPostTitle({ postType: PostTypeEnum.DOPYS, value }));
    }, 1000),
    [],
  );

  const dispatchDirections = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    dispatch(
      setPostDirections({ postType: PostTypeEnum.DOPYS, value: directions }),
    );
  };

  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS.isDone,
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.DOPYS,
          value: sanitizeHtml(content) as string,
        }),
      );
      dispatch(
        setIsDone({
          postType: PostTypeEnum.DOPYS,
          value: true,
        }),
      );
    }, 2000),
    [],
  );

  const dispatchPreview = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostPreviewText({
          postType: PostTypeEnum.DOPYS,
          value,
        }),
      );
    }, 1000),
    [],
  );

  const dispatchIsPreviewManuallyChanged = () => {
    dispatch(setPostPreviewManuallyChanged(PostTypeEnum.DOPYS));
  };

  const newPost: CreateDopysPostRequestType = {
    title: savedPostDraft.title,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    preview: savedPostDraft.preview.value,
    type: { id: 2 }, // must not be hardcoded
  };

  const previewPost = {
    author: user,
    content: savedPostDraft.htmlContent,
    preview: savedPostDraft.preview.value,
    createdAt: Date().toString(),
    directions: savedPostDraft.directions,
    title: savedPostDraft.title,
    type: { id: 2, name: 'Допис' }, // must not be hardcoded
  } as IPost;

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goNotePreview = () => {
    const state: PostPreviewLocationStateType = {
      actionType: 'create',
      postToSend: newPost,
      previewPost,
    };

    history.push(`/create-note/preview`, state);
  };

  return (
    <>
      <PageTitle title="Створення допису" />

      {allDirections.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={dispatchDirections}
          possibleFilters={allDirections}
          selectedFilters={savedPostDraft.directions}
          noAll
          maximumReached={savedPostDraft.directions.length === 3}
          filterTitle="Напрямки: "
        />
      ) : (
        <CircularProgress />
      )}
      <Box mt={2}>
        <Typography variant="h5">Заголовок статті: </Typography>
        <TextField
          error={Boolean(title.error)}
          helperText={title.error}
          fullWidth
          required
          id="article-name"
          value={title.value}
          onChange={(e) => {
            setTitle({ ...title, value: e.target.value });
            dispatchTitle(e.target.value);
          }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Текст статті:</Typography>
        <NoteEditor
          initialContent={savedPostDraft.htmlContent}
          initialPreview={savedPostDraft.preview.value}
          dispatchContent={dispatchHtmlContent}
          initialIsPreviewManuallyChanged={
            savedPostDraft.preview.isManuallyChanged
          }
          dispatchIsPreviewManuallyChanged={dispatchIsPreviewManuallyChanged}
          dispatchPreview={dispatchPreview}
          previewPost={previewPost}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goNotePreview}
          isDone={isDone}
        />
      </Box>
    </>
  );
};

export default NoteCreation;
