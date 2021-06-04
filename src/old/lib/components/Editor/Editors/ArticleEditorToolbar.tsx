import React from 'react';
import ImageHandlersContainer from '../CustomModules/ImageHandlersContainer';
import '../generalEditor.styles.css';
import { IEditorToolbarProps } from '../types';

const ArticleEditorToolbar: React.FC<IEditorToolbarProps> = ({ editor }) => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="2">Заголовок 1</option>
          <option value="3">Заголовок 2</option>
          <option value="4">Для вступу</option>
          <option value="5">Для приміток</option>
          <option value="">Звичайний</option>
        </select>
      </span>
      <span className="ql-formats">
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
        <button title="Underline" type="button" className="ql-underline" />
        {/* <button title="Strike" type="button" className="ql-strike" /> */}
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
        {/* <button
          title="Left Indent"
          type="button"
          className="ql-indent"
          value="-1"
        />
        <button
          title="Right Indent"
          type="button"
          className="ql-indent"
          value="+1"
        /> */}
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
      {/* <span className="ql-formats">
        <select title="Align" className="ql-align" />
      </span> */}
      <ImageHandlersContainer editor={editor} />
    </div>
  );
};

export default ArticleEditorToolbar;
