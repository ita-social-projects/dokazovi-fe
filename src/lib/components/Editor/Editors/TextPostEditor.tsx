import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { BorderBottom } from '../../Border';
import PreviewInput from '../PreviewInput';
import { GeneralEditor } from '../GeneralEditor';
import PostPreviewCard from '../../Posts/Cards/PostPreviewCard';
import { IPost } from '../../../types';
import { IEditorToolbarProps } from '../types';

interface ITextPostEditorProps {
  toolbar: React.ComponentType<IEditorToolbarProps>;
  initialHtmlContent?: string;
  initialPreview: string;
  onHtmlContentChange: (value: string) => void;
  initialWasPreviewManuallyChanged: boolean;
  onPreviewManuallyChanged?: () => void;
  onPreviewChange: (value: string) => void;
  previewPost: IPost;
}

const PostEditor: React.FC<ITextPostEditorProps> = ({
  toolbar,
  initialHtmlContent,
  initialPreview,
  onHtmlContentChange,
  initialWasPreviewManuallyChanged,
  onPreviewManuallyChanged,
  onPreviewChange,
  previewPost,
}) => {
  const [textContent, setTextContent] = useState<string>('');

  return (
    <>
      <GeneralEditor
        initialHtmlContent={initialHtmlContent}
        onHtmlContentChange={onHtmlContentChange}
        toolbar={toolbar}
        onTextContentChange={setTextContent}
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
            editorTextContent={
              !initialWasPreviewManuallyChanged ? textContent : undefined // optimizing rerenders when we don't need editor content
            }
            initialWasManuallyChanged={initialWasPreviewManuallyChanged}
            onManuallyChanged={onPreviewManuallyChanged}
            onPreviewChange={onPreviewChange}
          />
        </Grid>
        <Grid item xs={12} lg={4} md={6}>
          <PostPreviewCard post={previewPost} shouldNotUseLink />
        </Grid>
      </Grid>
    </>
  );
};

export const TextPostEditor = React.memo(PostEditor);
