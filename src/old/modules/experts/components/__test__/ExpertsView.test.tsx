import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { createMemoryHistory } from 'history';
import ExpertsView from '../ExpertsView';

const history = createMemoryHistory();
jest.mock('models/store');

const mockedState = {
  properties: {
    regions: [
      {
        id: 10,
        name: 'Київська область',
      },
    ],
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
      },
      {
        id: 4,
        name: 'therapy',
        label: 'Терапія',
      },
      {
        id: 7,
        name: 'pediatrics',
        label: 'Педіатрія',
      },
    ],
    loading: 'succeeded',
  },
  experts: {
    data: {
      expertIds: [10, 3, 7, 4, 6, 5, 8, 9, 11, 12, 13, 14],
      experts: {
        '3': {
          id: 3,
          firstName: 'UNICEF',
          lastName: 'Ukraine',
        },
        '4': {
          id: 4,
          firstName: 'Катерина',
          lastName: 'Булавінова',
        },
        '5': {
          id: 5,
          firstName: 'Наталя',
          lastName: 'Тімко-Іванченко',
        },
        '6': {
          id: 6,
          firstName: 'Віктор',
          lastName: 'Ляшко',
        },
        '7': {
          id: 7,
          firstName: 'Тетяна',
          lastName: 'Балтян',
        },
        '8': {
          id: 8,
          firstName: 'Олег',
          lastName: 'Токарчук',
        },
        '9': {
          id: 9,
          firstName: 'Алла',
          lastName: 'Шкіль',
        },
        '10': {
          id: 10,
          firstName: 'Вакцинована гарнюня',
          lastName: '',
        },
        '11': {
          id: 11,
          firstName: 'Тетяна',
          lastName: 'Токарчук',
        },
        '12': {
          id: 12,
          firstName: 'Олег',
          lastName: 'Балтян',
        },
        '13': {
          id: 13,
          firstName: 'Алла',
          lastName: 'Шкіль',
        },
        '14': {
          id: 14,
          firstName: 'Ще хтось',
          lastName: '',
        },
      },
      meta: {
        pageNumber: 0,
        totalPages: 1,
        totalElements: 14,
        isLastPage: false,
        appendExperts: true,
      },
    },
  },
};

store.getState = () => mockedState;

describe('ExpertsView component renders correctly', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertsView />
        </Router>
      </Provider>,
    );
  });
  it('Component renders with page title', () => {
    expect(screen.getByText('Вибрані автори:')).toBeInTheDocument();
  });
  it('Component renders with expert cards', () => {
    expect(screen.queryAllByRole('link')).toHaveLength(12);
  });
  it('Experts number renders correctly', () => {
    expect(screen.getByText(/12 авторів/)).toBeInTheDocument();
  });
});

describe('Checkboxes work correctly', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertsView />
        </Router>
      </Provider>,
    );
  });
  it('Check direction', async () => {
    const allTopicsCheckbox = screen.getByLabelText('Всі теми');
    const cardiologyCheckbox = screen.getByLabelText('Кардіологія');
    fireEvent.click(allTopicsCheckbox);
    fireEvent.click(cardiologyCheckbox);
    expect(await screen.findAllByRole('link')).toHaveLength(12);
  });
  it('Check region', async () => {
    const allREgionsCheckbox = screen.getByLabelText('Всі регіони');
    const kyivRegCheckbox = screen.getByLabelText('Київська область');
    act(() => {
      fireEvent.click(allREgionsCheckbox);
      fireEvent.click(kyivRegCheckbox);
    });
    expect(await screen.findAllByRole('link')).toHaveLength(12);
  });
});

describe('Load more button click', () => {
  it('Load more experts', async () => {
    const mockVisualViewport = {
      pageTop: 0,
    };
    Object.defineProperty(window, 'visualViewport', {
      writable: true,
      configurable: true,
      value: mockVisualViewport,
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertsView />
        </Router>
      </Provider>,
    );
    const loadMoreBtn = screen.getByText(/Показати ще/);
    act(() => {
      fireEvent.click(loadMoreBtn);
    });
    expect(await screen.findAllByRole('link')).toHaveLength(12);
  });
});

describe('Chip deleting', () => {
  it('Direction chip deleting', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertsView />
        </Router>
      </Provider>,
    );
    const chip = container.querySelector('.MuiChip-deleteIcon');
    const allDirectionsCheckbox = screen.getByLabelText('Всі теми');
    const cardiologyCheckbox = screen.getByLabelText('Кардіологія');
    fireEvent.click(allDirectionsCheckbox);
    fireEvent.click(cardiologyCheckbox);
    fireEvent.click(chip);
    expect(chip).not.toBeInTheDocument();
  });

  it('Region chip deleting', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertsView />
        </Router>
      </Provider>,
    );
    const allRegionsCheckbox = screen.getByLabelText('Всі регіони');
    const kyivRegCheckbox = screen.getByLabelText('Київська область');
    fireEvent.click(allRegionsCheckbox);
    fireEvent.click(kyivRegCheckbox);

    const chip = container.querySelector('.MuiChip-deleteIcon');
    fireEvent.click(chip);
    expect(chip).not.toBeInTheDocument();
  });
});
