import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import NoteEditor from '../../../lib/components/Editor/Editors/NoteEditor';
import {
  setPostTopics,
  setPostBody,
  setIsDone,
  setImageUrl,
} from '../store/postCreationSlice';
import { PostTopicSelector } from './PostTopicSelector';
import { PostTypeEnum } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PostCreationButtons from './PostCreationButtons';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';
import { createPost } from '../../../lib/utilities/API/api';
import BorderBottom from '../../../lib/components/Border';
import UrlInputModal from '../../../lib/components/Editor/CustomModules/UrlInputModal';
import { getImgurImageUrl } from '../../../lib/utilities/getImgurImageUrl';

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

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    '',
  ); // state for a link from Imgur

  const isDone = useSelector(
    (state: RootStateType) => state.newPostDraft.DOPYS.isDone,
  );

  const dispatchImageUrl = (backgroundImageUrl: string) => {
    dispatch(
      setImageUrl({
        postType: PostTypeEnum.DOPYS,
        value: backgroundImageUrl,
      }),
    );
  };

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

  const allDirections = directions.filter((direction) =>
    savedPostDraft.topics.includes(direction.id.toString()),
  );

  const newPost: CreatePostRequestType = {
    backgroundImageUrl: savedPostDraft.backgroundImageUrl || backgroundImage,
    content: savedPostDraft.htmlContent,
    directions: allDirections,
    preview: savedPostDraft.preview.value,
    type: { id: 2 }, // must not be hardcoded
  };

  const sendPost = async () => {
    const responsePost = await createPost(newPost);
    history.push(`/posts/${responsePost.data.id}`);
  };

  const goNotePreview = () => {
    history.push(`/create-note/preview`, {
      postType: 'DOPYS',
      publishPost: newPost,
    });
  };

  const fileSelectorHandler = (e) => {
    getImgurImageUrl(e);
  };

  return (
    <>
      <PageTitle title="Створення допису" />

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
      <Box mt={2} display="flex" flexDirection="column" alignItems="start">
        <Typography variant="h5">Фонове зображення:</Typography>
        <Box mb={2}>
          <UrlInputModal updateBackgroundImage={dispatchImageUrl} />
          <input type="file" name="file" onChange={fileSelectorHandler} />
        </Box>
        {newPost.backgroundImageUrl && (
          <img
            src={`${newPost.backgroundImageUrl}`}
            alt="preview"
            style={{ width: '360px', height: '240px' }}
          />
        )}
      </Box>
      <BorderBottom />
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
