import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import BorderBottom from '../../Border';
import PreviewInput from '../PreviewInput';
import GeneralEditor from '../GeneralEditor';
import ArticleEditorToolbar from './ArticleEditorToolbar';
import PostPreviewCard from '../../Posts/Cards/PostPreviewCard';
import { IPost } from '../../../types';

interface IArticleEditorProps {
  initialContent?: string;
  initialPreview: string;
  dispatchContent: (value: string) => void;
  initialIsPreviewManuallyChanged: boolean;
  dispatchIsPreviewManuallyChanged?: () => void;
  dispatchPreview: (value: string) => void;
  previewPost: IPost;
}

const ArticleEditor: React.FC<IArticleEditorProps> = ({
  initialContent,
  initialPreview,
  dispatchContent,
  initialIsPreviewManuallyChanged,
  dispatchIsPreviewManuallyChanged,
  dispatchPreview,
  previewPost,
}) => {
  const [textContent, setTextContent] = useState<string>('');

  return (
    <>
      <GeneralEditor
        initialContent={initialContent}
        dispatchHtmlContent={dispatchContent}
        toolbar={ArticleEditorToolbar}
        dispatchTextContent={setTextContent}
      />
      <BorderBottom />
      <Grid container direction="row" alignItems="stretch">
        <Grid
          item
          container
          xs={12}
          lg={8}
          md={6}
          direction="column"
          alignItems="stretch"
        >
          <PreviewInput
            initialPreview={initialPreview}
            editorContent={
              !initialIsPreviewManuallyChanged ? textContent : undefined // optimizing rerenders when we don't need editor content
            }
            initialIsManuallyChanged={initialIsPreviewManuallyChanged}
            dispatchIsManuallyChanged={dispatchIsPreviewManuallyChanged}
            dispatchPreview={dispatchPreview}
          />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <PostPreviewCard post={previewPost} shouldNotUseLink />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(ArticleEditor);
