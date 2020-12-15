import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';

const POST_MOCK = {
  author: {
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
    name: 'Dopys',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
};

beforeEach(() => render(<PostPreviewCard data={POST_MOCK} />));

describe('PostPreviewCard', () => {
  it('renders name postType', () => {
    const renderedPostType = screen.getByText('Dopys');
    expect(renderedPostType).toBeInTheDocument();
  });
});
