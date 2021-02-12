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

  // useEffect(() => {
  //   if (articleEditor.current) {
  //     const range = articleEditor.current.getEditor().getSelection();
  //     const deltaObj = articleEditor.current.getEditor().getContents();
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     if (deltaObj.ops?.find((op) => op?.insert?.image) && range) {
  //       articleEditor.current
  //         .getEditor()
  //         .insertEmbed(range.index - 1, 'figureB', 'user');
  //     }
  //     console.log(range);
  //     console.log(articleEditor.current.getEditor().getContents());
  //   }
  // }, [editorContent]);

  editor?.on('text-change', () => {
    // if (articleEditor.current) {
    //   const range = articleEditor.current.getEditor().getSelection();
    //   const deltaObj = articleEditor.current.getEditor().getContents();
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    //   if (deltaObj.ops?.find((op) => op?.insert?.image) && range) {
    //     articleEditor.current
    //       .getEditor()
    //       .insertEmbed(range.index - 1, 'figureB', 'user');
    //   }
    //   console.log(range);
    //   console.log(articleEditor.current.getEditor().getContents());
    // }
    setEditorContent(editor.getText());
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
