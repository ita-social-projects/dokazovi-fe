import React from 'react';
import '../generalEditor.styles.css';
import { IEditorToolbarProps } from '../types';

const VideoEditorToolbar: React.FC<IEditorToolbarProps> = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button title="Underline" type="button" className="ql-underline" />
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
      </span>
    </div>
  );
};

export default VideoEditorToolbar;
