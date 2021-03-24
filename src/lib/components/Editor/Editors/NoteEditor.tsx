import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import BorderBottom from '../../Border';
import PreviewInput from '../PreviewInput';
import GeneralEditor from '../GeneralEditor';
import PostPreviewCard from '../../Posts/Cards/PostPreviewCard';
import { IPost } from '../../../types';
import NoteEditorToolbar from './NoteEditorToolbar';

interface INoteEditorProps {
  initialHtmlContent?: string;
  initialPreview: string;
  onHtmlContentChange: (value: string) => void;
  initialIsPreviewManuallyChanged: boolean;
  onPreviewManuallyChanged?: () => void;
  onPreviewChange: (value: string) => void;
  previewPost: IPost;
}

const NoteEditor: React.FC<INoteEditorProps> = ({
  initialHtmlContent,
  initialPreview,
  onHtmlContentChange,
  initialIsPreviewManuallyChanged,
  onPreviewManuallyChanged,
  onPreviewChange,
  previewPost,
}) => {
  const [editorTextContent, setEditorTextContent] = useState<string>('');

  return (
    <>
      <GeneralEditor
        initialHtmlContent={initialHtmlContent}
        onHtmlContentChange={onHtmlContentChange}
        toolbar={NoteEditorToolbar}
        onTextContentChange={setEditorTextContent}
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
              !initialIsPreviewManuallyChanged ? editorTextContent : undefined // optimizing rerenders when we don't need editor content
            }
            initialIsManuallyChanged={initialIsPreviewManuallyChanged}
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

export default React.memo(NoteEditor);
