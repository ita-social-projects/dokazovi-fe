/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useQuery } from 'old/lib/hooks/useQuery';
import { useSelector } from 'react-redux';
import PostUpdationWrapper from '../PostUpdationWrapper';
import mockAllExperts from './mocks/allExperts.json';
import mockPostById from './mocks/postById.json';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('react-ga');

global.document.execCommand = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../old/lib/hooks/useQuery', () => ({
  useQuery: jest.fn(),
}));

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: (fn) => {
    fn.cancel = jest.fn();
    return fn;
  },
}));

jest.mock('../../../old/lib/utilities/API/api', () => ({
  getAllExperts: () =>
    Promise.resolve({
      data: mockAllExperts,
    }),
  getPostById: () =>
    Promise.resolve({
      data: mockPostById,
    }),
}));

describe('PostUpdationWrapper tests', () => {
  beforeEach(() => {
    useQuery.mockImplementation(() => ({ get: () => 1 }));
    useSelector.mockImplementation(() => {
      return { data: 'SET_IMPORTANCE' };
    });
  });

  it('should render error 404', async () => {
    useQuery.mockImplementation(() => ({ get: () => 2.34 }));

    render(
      <MemoryRouter>
        <PostUpdationWrapper />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith('/error_404'),
    );
  });

  it('should render editor', async () => {
    render(
      <MemoryRouter>
        <PostUpdationWrapper />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Заголовок статті:')).toBeInTheDocument();
      expect(screen.getByText('Фонове зображення:')).toBeInTheDocument();
      expect(screen.getByText('Текст статті:')).toBeInTheDocument();
    });
  });

  it('should render permission error notification', async () => {
    useSelector.mockImplementation(() => {
      return { data: ' ' };
    });

    render(
      <MemoryRouter>
        <PostUpdationWrapper />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(
        screen.getByText('На жаль, Ви не можете редагувати цей пост'),
      ).toBeInTheDocument(),
    );
  });
});
