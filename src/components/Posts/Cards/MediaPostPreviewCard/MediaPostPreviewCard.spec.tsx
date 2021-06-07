import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { IPost } from '../../../../old/lib/types';
import { MediaPostPreviewCard } from './MediaPostPreviewCard';

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
  counter: 1,
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

beforeEach(() =>
  render(
    <MemoryRouter>
      <MediaPostPreviewCard post={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('MediaPostPreviewCard', () => {
  it('renders postType', () => {
    expect(screen.getByText('Медитека')).toBeInTheDocument();
  });
  it('renders background image', () => {
    expect(screen.getByTestId('bgImage')).toBeInTheDocument();
  });
  it('renders title', () => {
    expect(screen.getByText('Ultrices eros in cursus')).toBeInTheDocument();
  });
  it('renders preview', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
      ),
    ).toBeInTheDocument();
  });
  it('renders creation date', () => {
    expect(screen.getByText('13 грудня')).toBeInTheDocument();
  });
});
