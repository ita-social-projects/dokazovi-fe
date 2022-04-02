import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { BorderBottom } from '../../../old/lib/components/Border';
import PreviewInput from '../PreviewInput';
import { GeneralEditor } from '../GeneralEditor';
import { PostPreviewCard } from '../../Posts/Cards/PostPreviewCard';
import { IPost } from '../../../old/lib/types';

interface ITextPostEditorProps {
  isVideoPost?: boolean;
  initialHtmlContent?: string;
  initialPreview: string;
  onHtmlContentChange: (value: string) => void;
  initialWasPreviewManuallyChanged: boolean;
  onPreviewManuallyChanged?: () => void;
  onPreviewChange: (value: string) => void;
  previewPost: IPost;
  disableAutoChanges?: () => void;
}

const PostEditor: React.FC<ITextPostEditorProps> = ({
  isVideoPost,
  initialHtmlContent,
  initialPreview,
  onHtmlContentChange,
  initialWasPreviewManuallyChanged,
  onPreviewManuallyChanged,
  onPreviewChange,
  previewPost,
  disableAutoChanges,
}) => {
  const [textContent, setTextContent] = useState<string>('');

  return (
    <>
      <GeneralEditor
        initialHtmlContent={initialHtmlContent}
        onHtmlContentChange={onHtmlContentChange}
        isVideoPost={isVideoPost}
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
            disableAutoChanges={disableAutoChanges}
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
