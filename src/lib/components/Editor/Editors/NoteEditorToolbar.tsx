import React from 'react';
import ImageHandlersContainer from '../CustomModules/ImageHandlersContainer';
import '../generalEditor.styles.css';
import { IEditorToolbarProps } from '../types';

const NoteEditorToolbar: React.FC<IEditorToolbarProps> = ({ editor }) => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button title="Underline" type="button" className="ql-underline" />
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
      </span>
      <ImageHandlersContainer editor={editor} />
    </div>
  );
};

export default NoteEditorToolbar;
