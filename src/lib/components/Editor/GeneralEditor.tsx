/* eslint-disable react/display-name */
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { RootStateType } from '../../../store/rootReducer';
import { setIsDone } from '../../../modules/postCreation/store/postCreationSlice';
import { PostTypeEnum } from '../../types';

export interface IQuillEditorProps {
  type: 'ARTICLE' | 'DOPYS';
  toolbar: React.ReactNode;
  dispatchContent: (s: string) => void;
}

const GeneralEditor = React.forwardRef<ReactQuill, IQuillEditorProps>(
  ({ type, toolbar, dispatchContent }, ref) => {
    const dispatch = useDispatch();

    const savedContent = useSelector(
      (state: RootStateType) => state.newPostDraft[type].htmlContent,
    );
    const [text, setText] = useState<string>(savedContent);

    const changeDone = useCallback(
      _.debounce(
        () => {
          dispatch(
            setIsDone({
              postType: PostTypeEnum[type],
              value: false,
            }),
          );
        },
        2000,
        { leading: true, trailing: false },
      ),
      [],
    );

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
              changeDone();
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
