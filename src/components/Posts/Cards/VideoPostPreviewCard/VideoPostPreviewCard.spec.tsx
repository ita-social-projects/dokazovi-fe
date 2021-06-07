import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { IPost } from '../../../../old/lib/types';
import { VideoPostPreviewCard } from './VideoPostPreviewCard';

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
  createdAt: '11.09.2020',
  title: 'Ultrices eros in title',
  counter: 1,
  publishedAt: '11.09.2020',
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
  preview:
    'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 2,
      name: 'Медіа',
      parameter: null,
    },
  ],
};

beforeEach(() =>
  render(
    <MemoryRouter>
      <VideoPostPreviewCard post={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('VideoPostPreviewCard', () => {
  it('renders video icon', () => {
    expect(screen.getByTestId('video-icon')).toBeInTheDocument();
  });
  it('renders background image', () => {
    expect(screen.getByTestId('bgImage')).toBeInTheDocument();
  });
  it('renders title', () => {
    expect(screen.getByText('Ultrices eros in title')).toBeInTheDocument();
  });
  it('renders preview', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
      ),
    ).toBeInTheDocument();
  });
  it('renders creation date', () => {
    expect(screen.getByText('11 вересня')).toBeInTheDocument();
  });
});
