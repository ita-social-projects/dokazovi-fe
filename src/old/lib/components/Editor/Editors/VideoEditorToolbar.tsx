import React from 'react';
import '../generalEditor.styles.css';
import { IEditorToolbarProps } from '../types';

const VideoEditorToolbar: React.FC<IEditorToolbarProps> = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="3">Заголовок</option>
          <option value="4">Вступ</option>
          <option value="5">Примітка</option>
          <option value="">Звичайний</option>
        </select>
      </span>
      <span className="ql-formats">
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
        <button title="Underline" type="button" className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button
          title="Ordered List"
          type="button"
          className="ql-list"
          value="ordered"
        />
        <button
          title="Unordered List"
          type="button"
          className="ql-list"
          value="bullet"
        />
      </span>
      <span className="ql-formats">
        <button
          title="Super"
          type="button"
          className="ql-script"
          value="super"
        />
        <button title="Sub" type="button" className="ql-script" value="sub" />
        <button title="Quote" type="button" className="ql-blockquote" />
        <button type="button" className="ql-link" />
      </span>
    </div>
  );
};

export default VideoEditorToolbar;
