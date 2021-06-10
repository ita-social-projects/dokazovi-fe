import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { PostPreviewCard } from './PostPreviewCard';
import { IPost } from '../../../old/lib/types';

const TRANSLATION_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus',
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
  createdAt: '27.11.2020',
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
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 3,
      name: 'Переклад',
      parameter: null,
    },
  ],
};
const MEDIA_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus',
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
  createdAt: '27.11.2020',
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
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
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
const EXPERT_OPINION_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus',
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
  createdAt: '27.11.2020',
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
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 9,
  origins: [
    {
      id: 1,
      name: 'Думка експерта',
      parameter: null,
    },
  ],
};
const VIDEO_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus',
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
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 2,
    name: 'Відео',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 11,
  origins: [
    {
      id: 2,
      name: 'Медитека',
      parameter: null,
    },
  ],
};

describe('PostPreviewCard', () => {
  it('renders translation postType', () => {
    render(
      <MemoryRouter>
        <PostPreviewCard post={TRANSLATION_POST_MOCK} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Переклад')).toBeInTheDocument();
  });
  it('renders video icon', () => {
    render(
      <MemoryRouter>
        <PostPreviewCard post={VIDEO_POST_MOCK} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('video-icon')).toBeInTheDocument();
  });
  it('renders expert opinion postType', () => {
    render(
      <MemoryRouter>
        <PostPreviewCard post={EXPERT_OPINION_POST_MOCK} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Думка експерта')).toBeInTheDocument();
  });
  it('renders media postType', () => {
    render(
      <MemoryRouter>
        <PostPreviewCard post={MEDIA_POST_MOCK} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Медитека')).toBeInTheDocument();
  });
});
