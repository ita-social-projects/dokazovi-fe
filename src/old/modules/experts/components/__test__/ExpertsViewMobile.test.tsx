import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IExpert, LoadingStatusEnum } from 'old/lib/types';
import ExpertsViewMobile from '../ExpertsViewMobile';

const EXPERTS_LIST_MOCK: IExpert[] = [
  {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    qualification: 'Лікар вищої категорії',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 6,
    firstName: 'Палана',
    lastName: 'Литвинова',
    qualification: 'Кандидат медичних наук',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
  },
  {
    id: 7,
    firstName: 'Таржеман',
    lastName: 'Соколов',
    qualification: 'Кандидат медичних наук',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
  {
    id: 16,
    firstName: 'Олег',
    lastName: 'Петренко',
    qualification: 'Лікар вищої категорії',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  },
];

const BLANK_EXPERTS_LIST_MOCK = [];

const setPageFn = jest.fn();

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn().mockReturnValue(null),
    unobserve: jest.fn().mockReturnValue(null),
    disconnect: jest.fn().mockReturnValue(null),
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('ExpertsViewMobile component renders with loading status Succeeded', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ExpertsViewMobile
          page={0}
          header="Experts"
          loading={LoadingStatusEnum.succeeded}
          experts={EXPERTS_LIST_MOCK}
          totalElements={4}
          SelectedTypes={<div>Selected Types</div>}
          FilterCheckboxes={<div>Filter Checkboxes</div>}
          setPage={setPageFn}
        />
      </MemoryRouter>,
    );
  });
  it('ExpertViewMobile renders', () => {
    expect(screen.getByText('Experts')).toBeInTheDocument();
  });
  it('All expert cards render', () => {
    expect(screen.getAllByRole('link').length).toBe(EXPERTS_LIST_MOCK.length);
  });
});

describe('ExpertsViewMobile component renders with loading status Pending', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ExpertsViewMobile
          page={0}
          header="Experts"
          loading={LoadingStatusEnum.pending}
          experts={EXPERTS_LIST_MOCK}
          totalElements={4}
          SelectedTypes={<div>Selected Types</div>}
          FilterCheckboxes={<div>Filter Checkboxes</div>}
          setPage={setPageFn}
        />
      </MemoryRouter>,
    );
  });

  it('Component does not render expert cards list', () => {
    expect(screen.queryAllByRole('link').length).toBe(0);
  });
  it('Component renders Circular progress', () => {
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('ExpertsViewMobile component renders with loading status Failed', () => {
  it('Component renders error message', () => {
    render(
      <MemoryRouter>
        <ExpertsViewMobile
          page={0}
          header="Experts"
          loading={LoadingStatusEnum.failed}
          experts={BLANK_EXPERTS_LIST_MOCK}
          totalElements={4}
          SelectedTypes={<div>Selected Types</div>}
          FilterCheckboxes={<div>Filter Checkboxes</div>}
          setPage={setPageFn}
        />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(
        'На жаль, даних, що відповідають вашому запиту, не знайдено.',
      ),
    ).toBeInTheDocument();
  });
});
