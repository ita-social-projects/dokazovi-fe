import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminDatePicker } from '../AdminDatePicker';

const mockOnSetChanged = jest.fn();

test('component renders properly with all props', () => {
  render(
    <AdminDatePicker
      start="01-01-2000"
      end="01-02-2000"
      setChanges={mockOnSetChanged}
    />,
  );

  expect(screen.getByTestId('select')).toBeInTheDocument();
});
