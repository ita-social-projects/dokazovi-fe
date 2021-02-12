/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  dispatchContent: (s: string) => void;
}

const GeneralEditor = React.forwardRef<ReactQuill, IQuillEditorProps>(
  ({ type, toolbar, dispatchContent }, ref) => {
    // TODO check version of quill in react quill and our quill ver
    const savedContent = useSelector(
      (state: RootStateType) => state.newPostDraft[type].htmlContent,
    );
    const [text, setText] = useState<string>(savedContent);
    const handleEditorContent = (content: string) => {
      setText(content);
      dispatchContent(content);
    };

    return (
      <>
        <div className="text-editor">
          {toolbar}
          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleEditorContent}
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
