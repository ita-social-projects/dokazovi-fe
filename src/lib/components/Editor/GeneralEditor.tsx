/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { RootStateType } from '../../../store/rootReducer';

export interface IQuillEditorProps {
  toolbar: React.ReactNode;
  dispatchContent: (s: string) => void;
}

const GeneralEditor = React.forwardRef<ReactQuill, IQuillEditorProps>(
  ({ toolbar, dispatchContent }, ref) => {
    const savedContent = useSelector(
      (state: RootStateType) => state.newPostDraft.htmlContent,
    );
    const [text, setText] = useState<string>(savedContent);

    return (
      <>
        <div className="text-editor">
          {toolbar}
          <ReactQuill
            theme="snow"
            value={text}
            onChange={(content) => {
              setText(content);
              dispatchContent(content);
            }}
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

export default GeneralEditor;
