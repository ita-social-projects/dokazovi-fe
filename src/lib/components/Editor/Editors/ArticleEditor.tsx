import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import { PostTypeEnum } from '../../../types';
import BorderBottom from '../../Border';
import ContentPreviewContainer from '../ContentPreviewContainer';
import GeneralEditor from '../GeneralEditor';
import ArticleEditorToolbar from './ArticleEditorToolbar';

interface IArticleEditorProps {
  dispatchContent: (content: string) => void;
  content?: string;
  preview?: string;
}

const ArticleEditor: React.FC<IArticleEditorProps> = ({
  dispatchContent,
  content,
  preview,
}) => {
  const [editor, setEditor] = useState<Quill>();
  const articleEditor = useRef<ReactQuill | null>(null);
  const [editorContent, setEditorContent] = useState<string>(content || '');

  useEffect(() => {
    if (articleEditor.current) {
      setEditor(articleEditor.current.getEditor());
      setEditorContent(
        articleEditor.current.getEditor().getText().slice(0, -1), // slice removes additional \n added by Quill
      );
      if (content) {
        articleEditor.current.getEditor().setText(content);
      }
    }
  }, []);

  editor?.on('text-change', () => {
    setEditorContent(editor.getText());
  });

  return (
    <>
      <GeneralEditor
        type={PostTypeEnum.ARTICLE}
        dispatchContent={dispatchContent}
        toolbar={<ArticleEditorToolbar editor={editor} />}
        ref={articleEditor}
      />
      <BorderBottom />
      <ContentPreviewContainer
        previewText={editorContent}
        previewType={PostTypeEnum.ARTICLE}
        previewCardType="Стаття"
      />
    </>
  );
};

export default ArticleEditor;
