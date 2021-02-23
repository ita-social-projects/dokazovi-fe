import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Container,
  CircularProgress,
  Typography,
  Box,
} from '@material-ui/core';
import NoteEditor from '../../lib/components/Editor/Editors/NoteEditor';
import { setPostTopics, setPostBody } from './store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../lib/types';
import { RootStateType } from '../../store/rootReducer';
import { sanitizeHtml } from '../../lib/utilities/sanitizeHtml';
import { postPublishPost } from '../../lib/utilities/API/api';
import PostCreationButtons from '../../lib/components/PostCreationButtons/PostCreationButtons';
import { PostPostRequestType } from '../../lib/utilities/API/types';

const NoteCreation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS,
  );

  const dispatchTopics = (topics: string[]) => {
    dispatch(setPostTopics({ postType: PostTypeEnum.DOPYS, value: topics }));
  };

  const dispatchHtmlContent = useMemo(
    () =>
      _.debounce((content: string) => {
        dispatch(
          setPostBody({
            postType: PostTypeEnum.DOPYS,
            value: sanitizeHtml(content) as string,
          }),
        );
      }, 2000),
    [dispatch],
  );

  const allDirections = Object.keys(savedPostDraft.topics)
    .filter((id) => savedPostDraft.topics[id])
    .map((direction) => ({ id: Number(direction) }));

  const newPost = {
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.preview.value,
    type: { id: 2 },
  } as PostPostRequestType;

  const sendPost = async () => {
    const responsePost = await postPublishPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goNotePreview = () => {
    history.push(`/create-note/preview`, {
      postType: 'DOPYS',
      publishPost: newPost,
    });
  };

  return (
    <Container fixed>
      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={dispatchTopics}
          topicList={directions}
          prevCheckedTopicsIds={
            _.isEmpty(savedPostDraft.topics) ? undefined : savedPostDraft.topics
          }
        />
      ) : (
        <CircularProgress />
      )}
      <Box mt={2}>
        <Container>
          <Typography variant="h5">Текст статті:</Typography>
        </Container>
        <NoteEditor dispatchContent={dispatchHtmlContent} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons publishPost={sendPost} goPreview={goNotePreview} />
      </Box>
    </Container>
  );
};

export default NoteCreation;
