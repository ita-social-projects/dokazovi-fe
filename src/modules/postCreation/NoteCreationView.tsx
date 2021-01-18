import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Container, CircularProgress, Typography } from '@material-ui/core';
import NoteEditor from '../../lib/components/Editor/Editors/NoteEditor';
import { setPostTopics, setPostBody } from './store/postCreationSlice';
import { ICheckboxes, PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../lib/types';
import { RootStateType } from '../../store/rootReducer';

const NoteCreationView: React.FC = () => {
  const dispatch = useDispatch();

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );
  const savedPostDraft = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS,
  );

  const dispatchTopics = (topics: ICheckboxes) => {
    dispatch(setPostTopics({ postType: PostTypeEnum.DOPYS, value: topics }));
  };

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      dispatch(setPostBody({ postType: PostTypeEnum.DOPYS, value: content }));
    }, 2000),
    [],
  );

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
      <Typography variant="h5">Текст статті:</Typography>
      <NoteEditor dispatchContent={dispatchHtmlContent} />
    </Container>
  );
};

export default NoteCreationView;
