import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { PostPreviewCard } from '../../../../components/Posts/Cards/PostPreviewCard';
import { IPost } from '../../types';

const POST_MOCK: IPost = {
  author: {
    id: 1,
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
    name: 'DOPYS',
  },
  origins: [
    {
      id: 1,
      name: 'some origin',
      parameter: null,
    },
  ],
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
};

beforeEach(() =>
  render(
    <MemoryRouter>
      <PostPreviewCard post={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('PostPreviewCard', () => {
  it('renders name postType', () => {
    const renderedPostType = screen.getByText('DOPYS');
    expect(renderedPostType).toBeInTheDocument();
  });
});
