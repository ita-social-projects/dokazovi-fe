import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PreviewInput from './PreviewInput';

const mockOnPreviewChange = jest.fn();
const mockOnManuallyChanged = jest.fn();

test('component renders properly with only required props', () => {
  render(
    <PreviewInput
      initialPreview="test"
      initialWasManuallyChanged
      onPreviewChange={mockOnPreviewChange}
    />,
  );

  expect(screen.getByTestId('preview-input')).toBeInTheDocument();
  expect(screen.getByTestId('preview-input')).toMatchSnapshot();
});

test('component renders properly with all props', () => {
  render(
    <PreviewInput
      initialPreview="initial preview text"
      initialWasManuallyChanged={false}
      onPreviewChange={mockOnPreviewChange}
      editorTextContent="Editor text content"
      onManuallyChanged={mockOnManuallyChanged}
    />,
  );

  expect(screen.getByTestId('preview-input')).toBeInTheDocument();
  expect(screen.getByTestId('preview-input')).toMatchSnapshot();
});

test('component renders initial preview text', () => {
  render(
    <PreviewInput
      initialPreview="test"
      initialWasManuallyChanged
      onPreviewChange={mockOnPreviewChange}
    />,
  );

  expect(screen.getByText('test')).toBeInTheDocument();
});

test('component changes initial text after user input', () => {
  render(
    <PreviewInput
      initialPreview="initial text"
      initialWasManuallyChanged={false}
      onPreviewChange={mockOnPreviewChange}
      onManuallyChanged={mockOnManuallyChanged}
    />,
  );
  fireEvent.change(screen.getByText('initial text'), {
    target: { value: 'test' },
  });
  expect(screen.getByText('test')).toBeInTheDocument();
});

test('component displays text length properly', () => {
  render(
    <PreviewInput
      initialPreview="initial text"
      initialWasManuallyChanged={false}
      onPreviewChange={mockOnPreviewChange}
      onManuallyChanged={mockOnManuallyChanged}
    />,
  );
  expect(
    screen.getByText(
      'Мінімальна довжина 50 символів. Довжина тексту: 12 символів',
    ),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByText('initial text'), {
    target: { value: 'test' },
  });
  expect(
    screen.getByText(
      'Мінімальна довжина 50 символів. Довжина тексту: 4 символи',
    ),
  ).toBeInTheDocument();
});

test('component calls callback after user input', () => {
  render(
    <PreviewInput
      initialPreview="initial text"
      initialWasManuallyChanged={false}
      onPreviewChange={mockOnPreviewChange}
      onManuallyChanged={mockOnManuallyChanged}
    />,
  );
  fireEvent.change(screen.getByText('initial text'), {
    target: { value: 'test' },
  });
  expect(mockOnPreviewChange).toBeCalled();
  expect(mockOnManuallyChanged).toBeCalled();
});
