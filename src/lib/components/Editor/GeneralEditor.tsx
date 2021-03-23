import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { IEditorToolbarProps } from './types';

export interface IQuillEditorProps {
  toolbar: React.ComponentType<IEditorToolbarProps>;
  initialContent?: string;
  dispatchHtmlContent: (htmlContent: string) => void;
  dispatchTextContent?: (textContent: string) => void;
}

const GeneralEditor: React.FC<IQuillEditorProps> = (props) => {
  const { initialContent, dispatchHtmlContent, dispatchTextContent } = props;
  const editorRef = useRef<ReactQuill>(null);
  const [editor, setEditor] = useState<Quill>();

  useEffect(() => {
    if (editorRef.current) {
      const editorResult = editorRef.current.getEditor();
      setEditor(editorResult);

      if (dispatchTextContent) {
        editorResult.on('text-change', () => {
          dispatchTextContent(editorResult.getText());
        });
      }
    }
  }, []);

  // const changeDone = useCallback(
  //   _.debounce(
  //     () => {
  //       dispatch(
  //         setIsDone({
  //           postType: PostTypeEnum[type],
  //           value: false,
  //         }),
  //       );
  //     },
  //     2000,
  //     { leading: true, trailing: false },
  //   ),
  //   [],
  // );

  return (
    <>
      <div className="text-editor">
        <props.toolbar editor={editor} />
        <ReactQuill
          theme="snow"
          defaultValue={initialContent}
          onChange={(content) => {
            dispatchHtmlContent(content);
            // changeDone();
          }}
          placeholder="Write something awesome..."
          modules={modules}
          formats={formats}
          ref={editorRef}
        />
      </div>
    </>
  );
};

export default GeneralEditor;
