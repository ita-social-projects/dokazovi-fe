import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import { NoteEditor } from '../../../lib/components/Editor/Editors/NoteEditor';
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
import { PostCreationButtons } from './PostCreationButtons';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { CreatePostRequestType } from '../../../lib/utilities/API/types';
import { createPost } from '../../../lib/utilities/API/api';
import { BorderBottom } from '../../../lib/components/Border';
import { getStringFromFile } from '../../../lib/utilities/Imgur/getStringFromFile';
import { uploadImageToImgur } from '../../../lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../../lib/components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';

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
  );

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

  const fileSelectorHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    getStringFromFile(e.target.files)
      .then((str) => uploadImageToImgur(str))
      .then((res) => {
        if (res.data.status === 200) {
          setBackgroundImage(res.data.data.link);
        }
      });
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
      <BackgroundImageContainer
        dispatchImageUrl={dispatchImageUrl}
        fileSelectorHandler={fileSelectorHandler}
        newPost={newPost}
      />
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
