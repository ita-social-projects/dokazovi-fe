import { Container } from '@material-ui/core';
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
}

const ArticleEditor: React.FC<IArticleEditorProps> = ({ dispatchContent }) => {
  const [editor, setEditor] = useState<Quill>();
  const articleEditor = useRef<ReactQuill | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    if (articleEditor.current) {
      setEditor(articleEditor.current.getEditor());
      setEditorContent(
        articleEditor.current.getEditor().getText().slice(0, -1), // slice removes additional \n added by Quill
      );
    }
  }, []);

  editor?.on('text-change', () => {
    console.log(editor.getContents());

    setEditorContent(editor.getText());
  });

  editor?.on('selection-change', (range) => {
    if (range) {
      if (range.length === 0) {
        console.log('User cursor is on', range.index);
      } else {
        const text = editor?.getText(range.index, range.length);
        console.log('User has highlighted', text);
      }
    } else {
      console.log('Cursor not in the editor');
    }
  });

  return (
    <>
      <Container>
        <GeneralEditor
          type="ARTICLE"
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
      </Container>
    </>
  );
};

export default ArticleEditor;
