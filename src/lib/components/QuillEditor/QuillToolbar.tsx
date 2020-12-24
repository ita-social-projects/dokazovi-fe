import React from 'react';
import './editor.styles.css';

export interface IQuillToolbarProps {}

// interface IExtraQuillField extends Quill {
//   whitelist: string[];
// }

// const Font = Quill.import('formats/font') as IExtraQuillField;
// const Size = Quill.import('formats/size') as IExtraQuillField;

// Font.whitelist = [
//   'arial',
//   'comic-sans',
//   'courier-new',
//   'georgia',
//   'helvetica',
//   'lucida',
// ];

// Size.whitelist = ['extra-small', 'small', 'medium', 'large'];

// Quill.register(Size, true);
// Quill.register(Font, true);

// function imageHandler() {
//     const range = Quill.getSelection();
//     const value = prompt('What is the image URL');
//     if(value) {
//       Quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
//     }
// };

const QuillToolbar: React.FC<IQuillToolbarProps> = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font">
          <option value="arial">Arial</option>
          {/* <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option> */}
        </select>
        <select className="ql-size">
          {/* <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option> */}
          <option value="medium">Size 1</option>
          {/* <option value="large">Size 4</option> */}
        </select>
        <select
          className="ql-header"
          defaultValue=""
          onBlur={(e) => e.persist()}
        >
          <option value="1">Заголовок 1</option>
          <option value="2">Заголовок 2</option>
          <option value="" selected>
            Звичайний
          </option>
        </select>
      </span>
      <span className="ql-formats">
        <button title="Bold" type="button" className="ql-bold" />
        <button title="Italic" type="button" className="ql-italic" />
        <button title="Underline" type="button" className="ql-underline" />
        <button title="Strike" type="button" className="ql-strike" />
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
        <button
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
        <button title="Blockquote" type="button" className="ql-blockquote" />
        {/* <button title="Direction" type="button" className="ql-direction" /> */}
      </span>
      <span className="ql-formats">
        <select title="Align" className="ql-align" />
        {/* <select title="Color" className="ql-color" /> */}
        {/* <select title="Background" className="ql-background" /> */}
      </span>
      <span className="ql-formats">
        <button title="Link" type="button" className="ql-link" />
        <button title="Image" type="button" className="ql-image" />
        <button title="Video" type="button" className="ql-video" />
      </span>
      <span className="ql-formats">
        {/* <button title="Formula" type="button" className="ql-formula" /> */}
        {/* <button title="Code-block" type="button" className="ql-code-block" /> */}
        <button title="Clean formatting" type="button" className="ql-clean" />
      </span>
    </div>
  );
};

export default QuillToolbar;
