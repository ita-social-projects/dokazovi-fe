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
} from '../store/postCreationSlice';
import { IDirection, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';

const ArticleCreation: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.ARTICLE,
  );
  const selectedDirections = _.isEmpty(savedPostDraft.directions)
    ? undefined
    : savedPostDraft.directions;

  const [title, setTitle] = useState({
    value: savedPostDraft.title || '',
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
    _.debounce((storedTitle: string) => {
      dispatch(
        setPostTitle({ postType: PostTypeEnum.ARTICLE, value: storedTitle }),
      );
    }, 1000),
    [],
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.ARTICLE,
          value: sanitizeHtml(content) as string,
        }),
      );
      dispatch(
        setIsDone({
          postType: PostTypeEnum.ARTICLE,
          value: true,
        }),
      );
    }, 2000),
    [],
  );

  const newPost: CreatePostRequestType = {
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions ?? [],
    preview: savedPostDraft.preview.value,
    title: savedPostDraft.title,
    type: { id: 1 }, // must not be hardcoded
  };

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goArticlePreview = () => {
    history.push(`/create-article/preview`, {
      postType: 'ARTICLE',
      publishPost: newPost,
    });
  };

  return (
    <>
      <PageTitle title="Створення статті" />

      {allDirections.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={dispatchDirections}
          possibleFilters={allDirections}
          selectedFilters={selectedDirections}
          noAll
          maximumReached={selectedDirections?.length === 3}
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
        <ArticleEditor dispatchContent={dispatchHtmlContent} />
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
