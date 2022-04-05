/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-this-alias */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { GeneralEditor } from './GeneralEditor';
import { EditorToolbar } from './Editors/EditorToolbar';

global.document.execCommand = jest.fn();
const mockHtmlContentCange = jest.fn();
const mockTextContantChange = jest.fn();
jest.mock('quill-image-uploader', () => () => {});

test('component renders with all props setted', () => {
  render(
    <GeneralEditor
      onHtmlContentChange={mockHtmlContentCange}
      onTextContentChange={mockTextContantChange}
      toolbar={EditorToolbar}
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
      toolbar={EditorToolbar}
      initialHtmlContent="<p>test111</p>"
    />,
  );
  expect(screen.getByText('test111')).toBeInTheDocument();
});

test('component renders without non required props', () => {
  render(
    <GeneralEditor
      onHtmlContentChange={mockHtmlContentCange}
      toolbar={EditorToolbar}
    />,
  );
  expect(screen.getByTestId('text-editor_test')).toBeInTheDocument();
  expect(screen.getByTestId('text-editor_test')).toMatchSnapshot();
});
