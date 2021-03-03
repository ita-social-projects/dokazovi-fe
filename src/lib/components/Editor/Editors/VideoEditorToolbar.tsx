import React from 'react';
import Quill from 'quill';
import '../generalEditor.styles.css';

export interface IVideoEditorToolbarProps {
  editor?: Quill;
}

const VideoEditorToolbar: React.FC<IVideoEditorToolbarProps> = ({ editor }) => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button title="Underline" type="button" className="ql-underline" />
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
      </span>
      <span className="ql-formats">
        <button
          type="button"
          className="ql-image MuiButtonBase-root MuiIconButton-root"
          tabIndex={0}
          title="Завантажити відео"
        />
      </span>
    </div>
  );
};

export default VideoEditorToolbar;
