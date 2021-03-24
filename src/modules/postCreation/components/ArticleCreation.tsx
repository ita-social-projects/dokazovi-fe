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
  setPostBody,
  setPostPreviewText,
  setPostPreviewManuallyChanged,
  resetDraft,
} from '../store/postCreationSlice';
import { IDirection, IPost, PostTypeEnum } from '../../../lib/types';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import { CreateArticlePostRequestType } from '../../../lib/utilities/API/types';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { createPost } from '../../../lib/utilities/API/api';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';

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

  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);

  const handleDirectionsChange = (checkedDirections: CheckboxFormStateType) => {
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

  const handleTitleChange = (value: string) => {
    dispatch(setPostTitle({ postType: PostTypeEnum.ARTICLE, value }));
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.ARTICLE,
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
          postType: PostTypeEnum.ARTICLE,
          value,
        }),
      );
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewManuallyChanged = () => {
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
        createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        directions: savedPostDraft.directions,
        title: savedPostDraft.title,
        type: { id: 1, name: 'Стаття' }, // must not be hardcoded
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    const response = await createPost(newPost);
    dispatch(resetDraft(PostTypeEnum.ARTICLE));
    history.push(`/posts/${response.data.id}`);
  };

  return (
    <>
      <PageTitle title="Створення статті" />
      {!previewing ? (
        <>
          {allDirections.length ? (
            <CheckboxDropdownFilterForm
              onFormChange={handleDirectionsChange}
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
                handleTitleChange(e.target.value);
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h5">Текст статті:</Typography>
            <ArticleEditor
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

export default ArticleCreation;
