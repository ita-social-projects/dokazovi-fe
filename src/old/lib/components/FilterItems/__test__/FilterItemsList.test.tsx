import React from 'react';
import { render, screen } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'models/store';
import { FilterItemsList } from '../FilterItemsList';

const mockData1 = {
  directions: [{ id: 2, name: 'ophthalmology', label: 'Офтальмологія' }],
};
const mockData2 = {
  directions: [{ id: 7, name: 'pediatrics', label: 'Педіатрія' }],
};

describe('Component renders correctly', () => {
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should find name from the directions list', () => {
    useSelectorMock.mockReturnValue(mockData1);
    render(
      <ReactRedux.Provider store={store}>
        <MemoryRouter>
          <FilterItemsList
            checkedNames="ophthalmology"
            checked
            isDisabledFilter={false}
          />
        </MemoryRouter>
      </ReactRedux.Provider>,
    );
    expect(screen.getByText('Офтальмологія')).toBeInTheDocument();
  });

  it('should not find name from the directions list', () => {
    useSelectorMock.mockReturnValue(mockData2);
    render(
      <ReactRedux.Provider store={store}>
        <MemoryRouter>
          <FilterItemsList
            checkedNames="ophthalmology"
            checked
            isDisabledFilter={false}
          />
        </MemoryRouter>
      </ReactRedux.Provider>,
    );
    expect(screen.getByText('ophthalmology')).toBeInTheDocument();
  });
});
