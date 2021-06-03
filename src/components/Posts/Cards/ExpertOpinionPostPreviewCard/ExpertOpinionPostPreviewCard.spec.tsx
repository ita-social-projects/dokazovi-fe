import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { IPost } from '../../../../old/lib/types';
import { ExpertOpinionPostPreviewCard } from './ExpertOpinionPostPreviewCard';

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
  preview:
    'Dolor sit amet consectetur adipiscing elit ut aliquam purus preview.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 1,
      name: 'Думка експерта',
      parameter: null,
    },
  ],
};

beforeEach(() =>
  render(
    <MemoryRouter>
      <ExpertOpinionPostPreviewCard post={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('ExpertOpinionPostPreviewCard', () => {
  it('renders postType', () => {
    expect(screen.getByText('Думка експерта')).toBeInTheDocument();
  });
  it('renders author name', () => {
    expect(screen.getByText('Іван Іванов')).toBeInTheDocument();
  });
  it('renders avatar', () => {
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });
  it('renders bio', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus bio',
      ),
    ).toBeInTheDocument();
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
    expect(screen.getByText('27 листопада')).toBeInTheDocument();
  });
});
