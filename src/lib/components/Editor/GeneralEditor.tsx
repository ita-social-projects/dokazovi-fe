/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { RootStateType } from '../../../store/rootReducer';

export interface IQuillEditorProps {
  type: 'ARTICLE' | 'DOPYS';
  toolbar: React.ReactNode;
}

const GeneralEditor = React.forwardRef<ReactQuill, IQuillEditorProps>(
  ({ type, toolbar }, ref) => {
    const savedContent = useSelector(
      (state: RootStateType) => state.newPostDraft[type].htmlContent,
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
