import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import ArticleEditor from '../../../lib/components/Editor/Editors/ArticleEditor';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { updatePost } from '../../../lib/utilities/API/api';
import { PostTopicSelector } from '../../postCreation/components/PostTopicSelector';
import { IPost } from '../../../lib/types';
import PostCreationButtons from '../../postCreation/components/PostCreationButtons';
import { RootStateType } from '../../../store/rootReducer';
import { UpdatePostRequestType } from '../../../lib/utilities/API/types';

export interface IArticleUpdationProps {
  post: IPost;
}

const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  const history = useHistory();
  const [topics, setTopics] = useState<string[]>(
    post.directions ? post.directions.map((d) => d.id.toString()) : [],
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
  const [title, setTitle] = useState({
    value: post.title || '',
    error: '',
  });

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );

  const allDirections = directions.filter((direction) =>
    topics.includes(direction.id.toString()),
  );

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      setHtmlContent(sanitizeHtml(content) as string);
    }, 2000),
    [],
  );

  const updatedPost: UpdatePostRequestType = {
    id: post.id,
    content: htmlContent!,
    directions: allDirections,
    preview: 'preview',
    title: title.value,
    type: { id: 1 }, // must not be hardcoded
  };

  const sendPost = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  const goArticlePreview = () => {
    history.push(`/edit-article/preview`, {
      postType: 'ARTICLE',
      publishPost: updatedPost,
    });
  };

  return (
    <>
      <PageTitle title="Редагування статті" />

      {directions.length ? (
        <PostTopicSelector
          dispatchTopics={(val) => setTopics(val)}
          topicList={directions}
          prevCheckedTopicsIds={allDirections.map((d) => d.id.toString())}
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
          }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Текст статті:</Typography>
        <ArticleEditor
          dispatchContent={dispatchHtmlContent}
          content={post.content}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        {/* <PostCreationButtons
          publishPost={sendPost}
          goPreview={goArticlePreview}
          isDone={isDone}
        /> */}
      </Box>
    </>
  );
};

export default ArticleUpdation;
