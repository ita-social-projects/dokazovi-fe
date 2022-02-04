import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxFilterForm from '../CheckboxFilterForm';

const PROPS_MOCK = {
  onFormChange: jest.fn(),
  possibleFilters: [
    { id: 1, name: 'Filter 1' },
    { id: 2, name: 'Filter 2' },
    { id: 3, name: 'Filter 3' },
  ],
  selectedFilters: [
    { id: 1, name: 'Filter 1' },
    { id: 2, name: 'Filter 2' },
    { id: 3, name: 'Filter 3' },
  ],
};

describe('CheckboxFilterForm tests', () => {
  beforeEach(() => {
    render(
      <CheckboxFilterForm
        onFormChange={PROPS_MOCK.onFormChange}
        possibleFilters={PROPS_MOCK.possibleFilters}
        selectedFilters={PROPS_MOCK.selectedFilters}
      />,
    );
  });
  it('should render CheckboxFilterForm component with possible checkboxes', () => {
    expect(screen.getAllByRole('checkbox')).toHaveLength(
      PROPS_MOCK.possibleFilters.length,
    );
  });
  it('should render component with checked checkboxes', () => {
    const areChecked = screen
      .getAllByRole('checkbox')
      .every((checkbox) => checkbox.hasAttribute('checked'));
    expect(areChecked).toBe(true);
  });
  it('should call onFormChange function by click', () => {
    const checkbox = screen.getByText('Filter 1') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(PROPS_MOCK.onFormChange).toHaveBeenCalled();
  });
});
