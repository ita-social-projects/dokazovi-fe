import React from 'react';
import { Quill } from 'react-quill';
import '../generalEditor.styles.css';

export interface INoteEditorToolbarProps {
  editor?: Quill;
}

const NoteEditorToolbar: React.FC<INoteEditorToolbarProps> = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button title="Underline" type="button" className="ql-underline" />
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
      </span>

      <span className="ql-formats">
        <button title="З комп'ютера" type="button" className="ql-image" />
      </span>
    </div>
  );
};

export default NoteEditorToolbar;
