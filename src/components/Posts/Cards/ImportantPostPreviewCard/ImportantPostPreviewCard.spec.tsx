import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { IPost } from '../../../../old/lib/types';
import { ImportantPostPreviewCard } from './ImportantPostPreviewCard';

const POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus bio',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '13.12.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 1,
    name: 'Стаття',
  },
  preview:
    'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 2,
      name: 'Медитека',
      parameter: null,
    },
  ],
};

const history = createMemoryHistory();

beforeEach(() => {
  render(
    <Router history={history}>
      <ImportantPostPreviewCard post={POST_MOCK} />
    </Router>,
  );
});

describe('ImportantPostPreviewCard', () => {
  it('renders expert`s name', () => {
    expect(
      screen.getByText(
        `${POST_MOCK.author.firstName} ${POST_MOCK.author.lastName}`,
      ),
    ).toBeInTheDocument();
  });

  it('renders expert`s main institution', () => {
    expect(
      screen.getByText(POST_MOCK.author.mainInstitution.name),
    ).toBeInTheDocument();
  });

  it('renders post title', () => {
    expect(screen.getByText(POST_MOCK.title)).toBeInTheDocument();
  });

  it('renders preview', () => {
    expect(screen.getByText(POST_MOCK.preview)).toBeInTheDocument();
  });

  it('redirects on post page, if you click on post title', () => {
    const link = screen.getByText(POST_MOCK.title);
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/posts/10');
  });

  it('redirects on expert`s page, if you click on expert`s name', () => {
    const link = screen.getByText(
      `${POST_MOCK.author.firstName} ${POST_MOCK.author.lastName}`,
    );
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/experts/1');
  });
});
