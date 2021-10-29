import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as constants from 'old/lib/constants/posts';
import { PostsList } from '../PostsList';

const postsMock = [
  {
    author: {
      avatar: 'https://i.imgur.com/k0j4vVH.png',
      firstName: 'Катерина',
      id: 59,
      lastName: 'Булавінова',
    },
    directions: [
      {
        id: 7,
        name: 'pediatrics',
        label: 'Педіатрія',
      },
    ],
    id: 115,
    origins: [{ id: 1, name: 'Думка експерта', parameters: null }],
    title: 'Lorem',
  },
  {
    author: {
      avatar: 'https://i.imgur.com/k0j4vVH.png',
      firstName: 'Олег',
      id: 14,
      lastName: 'Петренко',
    },
    directions: [
      {
        id: 7,
        name: 'pediatrics',
        label: 'Педіатрія',
      },
    ],
    id: 114,
    origins: [{ id: 1, name: 'Думка експерта', parameters: null }],
    title: 'Lorem',
  },
];

const emptyPostsListMock = [];

const resetPageMock = jest.fn();

describe('Component renders correctly', () => {
  it('should render all post cards', () => {
    Object.defineProperty(constants, 'LOAD_POSTS_LIMIT', { value: 2 });
    render(
      <MemoryRouter>
        <PostsList postsList={postsMock} resetPage={resetPageMock} />
      </MemoryRouter>,
    );
    expect(screen.getAllByTestId('avatar')).toHaveLength(2);
  });

  it('should render an empty post cards list', () => {
    render(
      <MemoryRouter>
        <PostsList postsList={emptyPostsListMock} resetPage={resetPageMock} />
      </MemoryRouter>,
    );
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('should render all post cards on mobile version', () => {
    render(
      <MemoryRouter>
        <PostsList postsList={postsMock} resetPage={resetPageMock} mobile />
      </MemoryRouter>,
    );
    expect(screen.getAllByTestId('avatar')).toHaveLength(2);
  });
});
