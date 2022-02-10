import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { filtersStateEnum, QueryTypeEnum } from '../../../types';
import { CheckboxLeftsideFilterForm } from '../CheckboxLeftsideFilterForm';

const history = createMemoryHistory();

const propsMock = {
  onFormChange: jest.fn(),
  possibleFilters: [
    {
      id: 1,
      name: 'pediatrics',
      label: 'Педіатрія',
    },
    {
      id: 2,
      name: 'ophthalmology',
      label: 'Офтальмологія',
    },
    {
      id: 3,
      name: 'dentistry',
      label: 'Стоматологія',
    },
  ],
  selectedFilters: {
    data: [
      {
        id: 1,
        name: 'pediatrics',
        label: 'Педіатрія',
      },
      {
        id: 2,
        name: 'ophthalmology',
        label: 'Офтальмологія',
      },
      {
        id: 3,
        name: 'dentistry',
        label: 'Стоматологія',
      },
    ],
    empty: filtersStateEnum.empty,
    notEmpty: filtersStateEnum.notEmpty,
  },
  filterTitle: 'За темою',
  allTitle: 'Всі',
  handleDelete: jest.fn(),
  expertId: 1,
  disabledDirections: [{ id: 1, name: 'pediatrics' }],
  disabledPostTypes: [{ id: 1, name: 'стаття' }],
  setTheOnlyAvailableFilter: jest.fn(),
  filterType: QueryTypeEnum,
};

describe('Filters renders correctly', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CheckboxLeftsideFilterForm
            onFormChange={propsMock.onFormChange}
            possibleFilters={propsMock.possibleFilters}
            selectedFilters={propsMock.selectedFilters.data}
            filterTitle={propsMock.filterTitle}
            allTitle={propsMock.allTitle}
            filterType={propsMock.filterType.DIRECTIONS}
          />
        </Router>
      </Provider>,
    );
  });
  it('Component renders all checkboxes', () => {
    expect(screen.queryAllByRole('checkbox')).toHaveLength(4);
  });
  it('Filter title renders', () => {
    expect(screen.getByText('За темою')).toBeInTheDocument();
  });
  it("Filters include checkbox 'Всі теми'", () => {
    expect(screen.getByText('Всі')).toBeInTheDocument();
  });
  it('Checkboxes are checked by default', () => {
    const result = screen
      .getAllByRole('checkbox')
      .every((item) => item.hasAttribute('checked'));
    expect(result).toEqual(false);
  });
  it('User click on checkbox', () => {
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(propsMock.onFormChange).toBeCalled();
  });
  it('Check all filters', () => {
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    const result = screen
      .getAllByRole('checkbox')
      .every((item) => item.hasAttribute('checked'));
    expect(result).toEqual(false);
  });
});

describe('Checkboxes state testing', () => {
  it('All checkboxes are not checked by default', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CheckboxLeftsideFilterForm
            onFormChange={propsMock.onFormChange}
            possibleFilters={propsMock.possibleFilters}
            selectedFilters={propsMock.selectedFilters.empty}
            filterTitle={propsMock.filterTitle}
            allTitle={propsMock.allTitle}
            handleDelete={propsMock.handleDelete}
            expertId={propsMock.expertId}
            filterType={propsMock.filterType.DIRECTIONS}
          />
        </Router>
      </Provider>,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.every((item) => item.hasAttribute('checked'))).toEqual(
      false,
    );
  });
  it('All checkboxes are disabled by default', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CheckboxLeftsideFilterForm
            onFormChange={propsMock.onFormChange}
            possibleFilters={propsMock.possibleFilters}
            selectedFilters={propsMock.selectedFilters.notEmpty}
            filterTitle={propsMock.filterTitle}
            allTitle={propsMock.allTitle}
            handleDelete={propsMock.handleDelete}
            expertId={propsMock.expertId}
            disabledDirections={propsMock.disabledDirections}
            disabledPostTypes={propsMock.disabledPostTypes}
            setTheOnlyAvailableFilter={propsMock.setTheOnlyAvailableFilter}
            filterType={propsMock.filterType.REGIONS}
          />
        </Router>
      </Provider>,
    );
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    const result = screen
      .getAllByRole('checkbox')
      .every((item) => item.hasAttribute('disabled'));
    expect(result).toEqual(true);
  });
  it('Filters are checked partially', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CheckboxLeftsideFilterForm
            onFormChange={propsMock.onFormChange}
            possibleFilters={propsMock.possibleFilters}
            selectedFilters={propsMock.selectedFilters.data.slice(0, 2)}
            filterTitle={propsMock.filterTitle}
            allTitle={propsMock.allTitle}
            disabledDirections={propsMock.disabledDirections}
            filterType={propsMock.filterType.DIRECTIONS}
          />
        </Router>
      </Provider>,
    );
    const checkbox = screen.getAllByRole('checkbox')[2];
    fireEvent.click(checkbox);
    const result = screen.getAllByRole('checkbox')[1].hasAttribute('checked');
    expect(result).toEqual(false);
  });
});
