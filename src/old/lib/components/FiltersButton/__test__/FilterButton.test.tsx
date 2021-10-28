import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterButton from '../FiltersButton';

const setFilterMenuOpenMock = jest.fn();

describe('Filter button', () => {
  it('should render button for opening filters menu', () => {
    render(
      <FilterButton
        filtersMenuOpen={false}
        setFiltersMenuOpen={setFilterMenuOpenMock}
      />,
    );
    expect(screen.getByText('Фільтри')).toBeInTheDocument();
  });

  it('should render button for closing filters menu', () => {
    const { container } = render(
      <FilterButton
        filtersMenuOpen
        setFiltersMenuOpen={setFilterMenuOpenMock}
      />,
    );
    const closeIcon = container.querySelector('svg');
    expect(closeIcon).toBeInTheDocument();
  });

  it('button should call handler function by click', () => {
    render(
      <FilterButton
        filtersMenuOpen={false}
        setFiltersMenuOpen={setFilterMenuOpenMock}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setFilterMenuOpenMock).toHaveBeenCalled();
  });
});
