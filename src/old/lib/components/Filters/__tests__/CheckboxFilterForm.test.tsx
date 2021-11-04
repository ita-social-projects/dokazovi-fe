import { Checkbox } from '@material-ui/core';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Checkbox ', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Checkbox />
      </MemoryRouter>,
    );
  });
  it('renders Checkbox', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('Checkbox click', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it('Checkbox focus', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toHaveFocus();
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });
});
