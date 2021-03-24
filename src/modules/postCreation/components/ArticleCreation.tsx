import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import ArticleEditor from '../../../lib/components/Editor/Editors/ArticleEditor';
import { RootStateType } from '../../../store/rootReducer';
import {
  setPostDirections,
  setPostTitle,
  setIsDone,
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
} from '../store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import { CreateArticlePostRequestType } from '../../../lib/utilities/API/types';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { PostPreviewLocationStateType } from './PostPreviewWrapper';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
  TITLE_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';

const ArticleCreation: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE,
  );
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const [title, setTitle] = useState({
    value: savedPostDraft.title,
    error: '',
  });

  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE.isDone,
  );

  const dispatchDirections = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    dispatch(
      setPostDirections({ postType: PostTypeEnum.ARTICLE, value: directions }),
    );
  };

  const dispatchTitle = useCallback(
    _.debounce((value: string) => {
      dispatch(setPostTitle({ postType: PostTypeEnum.ARTICLE, value }));
    }, TITLE_DEBOUNCE_TIMEOUT),
    [],
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.ARTICLE,
          value: sanitizeHtml(value) as string,
        }),
      );
      dispatch(
        setIsDone({
          postType: PostTypeEnum.ARTICLE,
          value: true,
        }),
      );
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const dispatchPreview = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostPreviewText({
          postType: PostTypeEnum.ARTICLE,
          value,
        }),
      );
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const dispatchIsPreviewManuallyChanged = () => {
    dispatch(setPostPreviewManuallyChanged(PostTypeEnum.ARTICLE));
  };

  const newPost: CreateArticlePostRequestType = {
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    type: { id: 1 }, // must not be hardcoded
  };

  const previewPost = React.useMemo(
    () =>
      ({
        author: user,
        content: savedPostDraft.htmlContent,
        preview: savedPostDraft.preview.value,
        createdAt: Date().toString(),
        directions: savedPostDraft.directions,
        title: savedPostDraft.title,
        type: { id: 1, name: 'Стаття' }, // must not be hardcoded
      } as IPost),
    [user, savedPostDraft],
  );

  const sendPost = async () => {
    const response = await createPost(newPost);
    history.push(`/posts/${response.data.id}`);
  };

  const goArticlePreview = () => {
    const state: PostPreviewLocationStateType = {
      actionType: 'create',
      postToSend: newPost,
      previewPost,
    };

    history.push(`/create-article/preview`, state);
  };

  return (
    <>
      <PageTitle title="Створення статті" />

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
        <ArticleEditor
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
          goPreview={goArticlePreview}
          isDone={isDone}
        />
      </Box>
    </>
  );
};

export default ArticleCreation;
