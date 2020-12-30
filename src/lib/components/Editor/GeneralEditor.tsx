/* eslint-disable react/display-name */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';

export interface IQuillEditorProps {
  toolbar: React.ReactNode;
}

const QuillEditorComp = React.forwardRef<ReactQuill | null, IQuillEditorProps>(
  ({ toolbar }, ref) => {
    const [text, setText] = useState<string>('');
    return (
      <>
        <div className="text-editor">
          {toolbar}
          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            placeholder="Write something awesome..."
            modules={modules}
            formats={formats}
            ref={ref}
          />
        </div>
      </>
    );
  },
);

export default QuillEditorComp;
