import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import QuillToolbar from './QuillToolbar';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';

export interface IQuillEditorProps {}

const QuillEditor: React.FC<IQuillEditorProps> = () => {
  const [text, setText] = useState<string>('');

  return (
    <>
      <div className="text-editor">
        <QuillToolbar />
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          placeholder="Write something awesome..."
          modules={modules}
          formats={formats}
        />
      </div>
      {text}
    </>
  );
};

export default QuillEditor;
