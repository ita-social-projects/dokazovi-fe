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
  setPostTitle,
  setPostDirections,
  setPostPreviewManuallyChanged,
  setPostPreviewText,
  resetDraft,
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
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';

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

  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);

  const dispatchTitle = (value: string) => {
    dispatch(setPostTitle({ postType: PostTypeEnum.DOPYS, value }));
  };

  const handleDirectionsChange = (checkedDirections: CheckboxFormStateType) => {
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

  const handleHtmlContentChange = useCallback(
    _.debounce((value: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.DOPYS,
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
          postType: PostTypeEnum.DOPYS,
          value,
        }),
      );
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewManuallyChanged = () => {
    dispatch(setPostPreviewManuallyChanged(PostTypeEnum.DOPYS));
  };

  const newPost: CreateDopysPostRequestType = {
    title: savedPostDraft.title,
    content: savedPostDraft.htmlContent,
    directions: savedPostDraft.directions,
    preview: savedPostDraft.preview.value,
    type: { id: 2 }, // must not be hardcoded
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
        type: { id: 2, name: 'Допис' }, // must not be hardcoded
      } as IPost),
    [user, savedPostDraft],
  );

  const handlePublishClick = async () => {
    const responsePost = await createPost(newPost);
    dispatch(resetDraft(PostTypeEnum.DOPYS));
    history.push(`/posts/${responsePost.data.id}`);
  };

  const handleCancelClick = () => {
    dispatch(resetDraft(PostTypeEnum.DOPYS));
    history.goBack();
  };

  return (
    <>
      <PageTitle title="Створення допису" />
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
            <Typography variant="h5">Заголовок допису: </Typography>
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
            <Typography variant="h5">Текст допису:</Typography>
            <NoteEditor
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
        onCancelClick={handleCancelClick}
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

export default NoteCreation;
