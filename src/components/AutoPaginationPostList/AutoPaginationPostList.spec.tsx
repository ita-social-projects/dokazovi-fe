import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AutoPaginationPostList } from './AutoPaginationPostList';
import { IPost } from '../../old/lib/types';

const posts: IPost[] = [
  {
    id: 277,
    title: 'Hello Hello',
    preview: 'Preview',
    content: '<p>Content</p>',
    previewImageUrl: '',
    author: {
      id: 16,
      firstName: 'Дмитро',
      lastName: 'Степаненко',
      avatar: 'https://i.pravatar.cc/300?img=8',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
      mainInstitution: {
        id: 2,
        name: 'Новий зір',
        city: {
          id: 190,
          name: 'Київ',
        },
      },
    },
    directions: [
      {
        id: 5,
        name: 'virology',
        label: 'Вірусологія',
        color: '#da80e8',
        hasDoctors: true,
        hasPosts: true,
      },
      {
        id: 1,
        name: 'covid-19',
        label: 'Covid-19',
        color: '#ef5350',
        hasDoctors: true,
        hasPosts: true,
      },
      {
        id: 3,
        name: 'surgery',
        label: 'Хірургія',
        color: '#7aebbf',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    tags: [],
    type: {
      id: 3,
      name: 'Допис',
    },
    origins: [
      {
        id: 1,
        name: 'Думка експерта',
        parameter: null,
      },
    ],
    createdAt: '01.10.2021',
    modifiedAt: '01.10.2021',
    publishedAt: '01.10.2021',
    importantImageUrl: '',
  },
];

describe('AutoPaginationPostList', () => {
  function setupIntersectionObserverMock({
    root = null,
    rootMargin = '',
    thresholds = [],
    disconnect = () => null,
    observe = () => null,
    takeRecords = () => [],
    unobserve = () => null,
  } = {}): void {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = root;

      readonly rootMargin: string = rootMargin;

      readonly thresholds: ReadonlyArray<number> = thresholds;

      disconnect: () => void = disconnect;

      observe: (target: Element) => void = observe;

      takeRecords: () => IntersectionObserverEntry[] = takeRecords;

      unobserve: (target: Element) => void = unobserve;
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  }

  beforeEach(() => {
    setupIntersectionObserverMock();
  });

  it('render post type', () => {
    render(
      <MemoryRouter>
        <AutoPaginationPostList posts={posts} setPage={jest.fn} />{' '}
      </MemoryRouter>,
    );
    expect(screen.getByText('Думка експерта')).toBeInTheDocument();
  });
});
