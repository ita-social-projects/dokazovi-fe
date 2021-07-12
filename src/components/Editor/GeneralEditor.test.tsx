/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-this-alias */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { GeneralEditor } from './GeneralEditor';
import { VideoEditorToolbar } from './Editors/VideoEditorToolbar';

global.document.execCommand = jest.fn((value) => value);

const mockHtmlContentCange = jest.fn((value) => value);
const mockTextContantChange = jest.fn((value) => value);
jest.mock(
  'quill-image-uploader',
  () =>
    function (quill, options) {
      const self = this;
      self.quill = quill;
      self.options = options;
      self.range = null;
      self.selectLocalImage = jest.fn((value) => value);
      self.handleDrop = jest.fn((value) => value);
      self.handlePaste = jest.fn((value) => value);
      self.readAndUploadFile = jest.fn((value) => value);
      self.fileChanged = jest.fn((value) => value);
      self.insertBase64Image = jest.fn((value) => value);
      self.insertToEditor = jest.fn((value) => value);
      self.removeBase64Image = jest.fn((value) => value);
    },
);

test('component renders with all props setted', () => {
  render(
    <GeneralEditor
      onHtmlContentChange={mockHtmlContentCange}
      onTextContentChange={mockTextContantChange}
      toolbar={VideoEditorToolbar}
      initialHtmlContent="<p>test</p>"
    />,
  );
  expect(screen.getByTestId('text-editor_test')).toBeInTheDocument();
  expect(screen.getByTestId('text-editor_test')).toMatchSnapshot();
});

test('component renders innitial HTML content', () => {
  render(
    <GeneralEditor
      onHtmlContentChange={mockHtmlContentCange}
      onTextContentChange={mockTextContantChange}
      toolbar={VideoEditorToolbar}
      initialHtmlContent="<p>test111</p>"
    />,
  );
  expect(screen.getByText('test111')).toBeInTheDocument();
});

test('component renders without non required props', () => {
  render(
    <GeneralEditor
      onHtmlContentChange={mockHtmlContentCange}
      toolbar={VideoEditorToolbar}
    />,
  );
  expect(screen.getByTestId('text-editor_test')).toBeInTheDocument();
  expect(screen.getByTestId('text-editor_test')).toMatchSnapshot();
});
