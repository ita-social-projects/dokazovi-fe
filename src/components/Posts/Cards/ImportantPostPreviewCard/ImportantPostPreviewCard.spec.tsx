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
  it('redirects on post page, if you click on slider', () => {
    const link = screen.getByTestId('post-slider');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/posts/10');
  });
});
