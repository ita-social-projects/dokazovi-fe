import React, { useCallback } from 'react';
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
import PostCreationButtons from '../../lib/components/PostCreationButtons/PostCreationButtons';

const NoteCreationView: React.FC = () => {
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

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(
        setPostBody({
          postType: PostTypeEnum.DOPYS,
          value: sanitizeHtml(content) as string,
        }),
      );
    }, 2000),
    [],
  );

  const goNotePreview = () => {
    history.push(`/create-note/preview`, 'DOPYS');
  };

  return (
    <Container fixed>
      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={dispatchTopics}
          topicList={directions}
          prevCheckedTopics={
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
      <PostCreationButtons goPreview={goNotePreview} />
    </Container>
  );
};

export default NoteCreationView;
