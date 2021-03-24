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
import { IDirection, IPost } from '../../../lib/types';
import PostCreationButtons from '../../postCreation/components/PostCreationButtons';
import { RootStateType } from '../../../store/rootReducer';
import { UpdateArticlePostRequestType } from '../../../lib/utilities/API/types';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';
import PostView from '../../posts/components/PostView';

export interface IArticleUpdationProps {
  post: IPost;
}

const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  const history = useHistory();
  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
  const [preview, setPreview] = useState(post.preview);
  const [title, setTitle] = useState({
    value: post.title,
    error: '',
  });

  const [typing, setTyping] = useState({ content: false, preview: false });
  const [previewing, setPreviewing] = useState(false);

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const handleDirectionsChange = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    setSelectedDirections(directions);
  };

  const handleHtmlContentChange = useCallback(
    _.debounce((content: string) => {
      setHtmlContent(sanitizeHtml(content));
      setTyping({ ...typing, content: false });
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const handlePreviewChange = useCallback(
    _.debounce((value: string) => {
      setPreview(value);
      setTyping({ ...typing, preview: false });
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const updatedPost: UpdateArticlePostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    preview,
    title: title.value,
    type: post.type,
  };

  const previewPost: IPost = {
    ...post,
    content: htmlContent,
    preview,
    directions: selectedDirections,
    title: title.value,
    type: post.type,
  };

  const handlePublishClick = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  return (
    <>
      <PageTitle title="Редагування статті" />

      {!previewing ? (
        <>
          {allDirections.length ? (
            <CheckboxDropdownFilterForm
              onFormChange={handleDirectionsChange}
              possibleFilters={allDirections}
              selectedFilters={selectedDirections}
              noAll
              maximumReached={selectedDirections.length === 3}
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
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h5">Текст статті:</Typography>
            <ArticleEditor
              initialHtmlContent={htmlContent}
              initialPreview={preview}
              onHtmlContentChange={(value) => {
                setTyping({ ...typing, content: true });
                handleHtmlContentChange(value);
              }}
              initialIsPreviewManuallyChanged
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
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          onPublishClick={handlePublishClick}
          onPreviewClick={() => {
            setPreviewing(!previewing);
          }}
          previewing={previewing}
          disabled={Object.values(typing).some((i) => i)}
        />
      </Box>
    </>
  );
};

export default ArticleUpdation;
