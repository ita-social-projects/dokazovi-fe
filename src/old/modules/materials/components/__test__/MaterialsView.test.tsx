import React from 'react';
import { render, screen } from '@testing-library/react';
import MaterialsView from '../MaterialsView';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { LoadingStatusEnum } from 'old/lib/types';
import { MemoryRouter } from 'react-router-dom';

const mockedState = {
  page: 1,
  header: 'Materials',
  loading: LoadingStatusEnum.succeeded,
  properties: {
    origins: [
      {
        id: 1,
        name: 'Думка експерта',
        parameters: null,
      },
      {
        id: 2,
        name: 'Медитека',
        parameters: null,
      },
      {
        id: 3,
        name: 'Переклади',
        parameters: null,
      },
    ],
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
      },
      {
        id: 7,
        name: 'pediatrics',
        label: 'Педіатрія',
      },
      {
        id: 5,
        name: 'virology',
        label: 'Вірусологія',
      },
    ],
    postTypes: [
      { id: 2, name: 'Статті' },
      { id: 1, name: 'Дописи' },
      { id: 3, name: 'Відео' },
    ],
    regions: [],
    loading: 'succeeded',
  },
  materials: {
    data: {
      postIds: [1, 114],
      posts: {
        '1': {
          id: 1,
          title: 'Proin nibh nisl condimentum',
          preview: 'Fermentum iaculis',
          directions: [
            {
              id: 7,
              name: 'pediatrics',
              label: 'Педіатрія',
              hasDoctors: true,
              hasPosts: true,
            },

            {
              id: 6,
              name: 'cardiology',
              label: 'Кардіологія',
              hasDoctors: true,
              hasPosts: true,
            },
          ],
          tags: [],
          type: {
            id: 2,
            name: 'Відео',
          },
          status: 'PUBLISHED',
          origins: [
            {
              id: 1,
              name: 'Думка експерта',
              parameters: null,
            },
          ],
          createdAt: '16.02.2021',
          modifiedAt: '16.02.2021',
          publishedAt: '20.10.2021',
          importanceOrder: null,
          importantImageUrl: '',
        },
        '114': {
          id: 114,
          title: 'Допис Lorem Ipsum',
          preview: 'Існує багато варіацій уривків з Lorem Ipsum',
          videoUrl: null,
          previewImageUrl: '',
          author: {
            id: 14,
            firstName: 'Олег',
            lastName: 'Петренко',
          },
          directions: [
            {
              id: 5,
              name: 'virology',
              label: 'Вірусологія',
            },
          ],
          tags: [],
          type: {
            id: 3,
            name: 'Допис',
          },
          status: 'PUBLISHED',
          origins: [
            {
              id: 2,
              name: 'Медитека',
              parameters: null,
            },
          ],
          createdAt: '06.01.2022',
          modifiedAt: '06.01.2022',
          publishedAt: '22.10.2021',
          importanceOrder: null,
          importantImageUrl: '',
        },
      },
      meta: {
        isLastPage: true,
        pageNumber: 0,
        totalElements: 2,
        totalPages: 1,
      },
    },
  },
};

store.getState = () => mockedState;

describe('MaterialsView component renders correctly', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MaterialsView />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('Component renders with page title', () => {
    expect(screen.getByText('Вибрані матеріали:')).toBeInTheDocument();
  });

  it('Materials number renders correctly', () => {
    expect(screen.getByText(/2 матеріали/)).toBeInTheDocument();
  });

  it('Component renders with all material cards', () => {
    expect(screen.queryAllByRole('link')).toHaveLength(2);
  });

  it('Filters section renders correctly', () => {
    expect(screen.getByText('за джерелом')).toBeInTheDocument();
    expect(screen.getByText('за типом')).toBeInTheDocument();
    expect(screen.getByText('за темою')).toBeInTheDocument();
  });

  it('Filter by direction renders correctly', () => {
    expect(screen.getByText('Кардіологія')).toBeInTheDocument();
  });

  it('Material card include correct preview', () => {
    expect(
      screen.getByText('Існує багато варіацій уривків з Lorem Ipsum'),
    ).toBeInTheDocument();
  });

  it('Load more button sould not render when it is last page', () => {
    expect(screen.queryByText('Показати ще')).toBeNull();
  });
});
