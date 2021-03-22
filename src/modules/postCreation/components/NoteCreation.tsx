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
} from '../store/postCreationSlice';
import { IDirection, PostTypeEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CreateDopysPostRequestType } from '../../../lib/utilities/API/types';

const NoteCreation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS,
  );

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

  const newPost: CreateDopysPostRequestType = {
    title: savedPostDraft.title,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    preview: savedPostDraft.preview.value,
    type: { id: 2 }, // must not be hardcoded
  };

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goNotePreview = () => {
    history.push(`/create-note/preview`, {
      postType: PostTypeEnum.DOPYS,
      publishPost: newPost,
    });
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
        <NoteEditor dispatchContent={dispatchHtmlContent} />
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
