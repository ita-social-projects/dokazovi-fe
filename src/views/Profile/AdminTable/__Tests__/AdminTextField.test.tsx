import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminTextField } from '../AdminTextField';
import { FieldEnum } from '../../../../models/adminLab/types';

const mockOnSetChanged = jest.fn();

test('component renders properly with all props', () => {
  render(
    <AdminTextField
      field={FieldEnum}
      setChanges={mockOnSetChanged}
      inputValue="test"
      placeholder="test"
    />,
  );

  expect(screen.getByTestId('admin-text-filter')).toBeInTheDocument();
  expect(screen.getByTestId('admin-text-filter')).toMatchSnapshot();
});

test('component renders initial preview text', () => {
  render(
    <AdminTextField
      field={FieldEnum}
      setChanges={mockOnSetChanged}
      inputValue="test"
      placeholder="test"
    />,
  );

  expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
});
