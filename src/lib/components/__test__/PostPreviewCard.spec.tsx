import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';

const POST_MOCK = {
  author: {
    id: 1,
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    workPlace: 'Адоніс',
  },
  createdAt: '27.11.2020',
  mainDirection: {
    id: 1,
    color: 'red',
    name: 'Хірургія',
  },
  title: 'Ultrices eros in cursus',
  postType: {
    id: 1,
    name: 'DOPYS',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
};

beforeEach(() =>
  render(
    <MemoryRouter>
      <PostPreviewCard data={POST_MOCK} />
    </MemoryRouter>,
  ),
);

describe('PostPreviewCard', () => {
  it('renders name postType', () => {
    const renderedPostType = screen.getByText('DOPYS');
    expect(renderedPostType).toBeInTheDocument();
  });
});
