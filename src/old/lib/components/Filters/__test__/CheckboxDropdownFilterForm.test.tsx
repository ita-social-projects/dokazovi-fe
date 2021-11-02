import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { MemoryRouter } from 'react-router-dom';
import { CheckboxDropdownFilterForm } from '../CheckboxDropdownFilterForm';

const formChangeHandlerMock = jest.fn();
const possibleFiltersMock = [
  { id: 1, name: 'dentistry', label: 'Стоматологія' },
  { id: 2, name: 'ophthalmology', label: 'Офтальмологія' },
  { id: 7, name: 'pediatrics', label: 'Педіатрія' },
  { id: 8, name: 'something', label: 'Something' },
];
const selectedFiltersMock = [
  { id: 1, name: 'dentistry', label: 'Стоматологія' },
  { id: 2, name: 'ophthalmology', label: 'Офтальмологія' },
  { id: 7, name: 'pediatrics', label: 'Педіатрія' },
  { id: 8, name: 'something', label: 'Something' },
];
const filterTitleMock = 'Теми';

const checkCheckbox = (checkboxLabel) => {
  const title = screen.getByText('Теми');
  fireEvent.click(title);
  const checkbox = screen.getByLabelText(checkboxLabel) as HTMLInputElement;
  fireEvent.click(checkbox);
};

describe('CheckboxDropdownFilterForm tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckboxDropdownFilterForm
            onFormChange={formChangeHandlerMock}
            possibleFilters={possibleFiltersMock}
            selectedFilters={[]}
            filterTitle={filterTitleMock}
            noAll={true}
            maximumReached={false}
            isRequired={true}
          />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('should render filter title', () => {
    expect(screen.getByText('Теми')).toBeInTheDocument();
  });
  it('should render all possible filter checkboxes', () => {
    const title = screen.getByText('Теми');
    fireEvent.click(title);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
  });
  it('should render closed CheckboxDropdownFilterForm component', () => {
    expect(screen.getByText('pediatrics')).not.toBeVisible();
  });
  it('should render filter checkboxes after clicking on the title', () => {
    const title = screen.getByText('Теми');
    fireEvent.click(title);
    expect(screen.getByText('pediatrics')).toBeVisible();
  });
  it('checkbox item should become checked by click', () => {
    checkCheckbox('ophthalmology');
    expect(formChangeHandlerMock).toBeCalled();
  });
});

describe('Checkbox selection tests', () => {
  it('should render all checkboxes as checked and uncheck them by click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckboxDropdownFilterForm
            onFormChange={formChangeHandlerMock}
            possibleFilters={possibleFiltersMock}
            selectedFilters={selectedFiltersMock}
            filterTitle={filterTitleMock}
          />
        </MemoryRouter>
      </Provider>,
    );
    checkCheckbox('ophthalmology');
    expect(formChangeHandlerMock).toBeCalled();
  });

  it('should not render list of checked checkboxes', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckboxDropdownFilterForm
            onFormChange={formChangeHandlerMock}
            possibleFilters={possibleFiltersMock}
            filterTitle={filterTitleMock}
            noAll={true}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(container.querySelectorAll('.directionChip')).toHaveLength(0);
  });

  it("should render checkbox with label 'Всі' and show chiplist after clicking", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckboxDropdownFilterForm
            onFormChange={formChangeHandlerMock}
            possibleFilters={possibleFiltersMock}
            selectedFilters={selectedFiltersMock}
            filterTitle={filterTitleMock}
            noAll={false}
          />
        </MemoryRouter>
      </Provider>,
    );
    checkCheckbox('Всі');
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it("should render checkbox with label 'Всі' and check all after clicking", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckboxDropdownFilterForm
            onFormChange={formChangeHandlerMock}
            possibleFilters={possibleFiltersMock}
            selectedFilters={[]}
            filterTitle={filterTitleMock}
            noAll={false}
          />
        </MemoryRouter>
      </Provider>,
    );
    checkCheckbox('Всі');
    const checked = screen.getAllByRole('checkbox')[1] as HTMLInputElement;
    expect(checked.checked).toBe(true);
  });
});
