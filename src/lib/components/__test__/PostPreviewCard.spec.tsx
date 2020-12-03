import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import MOCK_NEWEST from '../../../modules/main/components/constants/newestPosts-mock';

const { mainDirection, postType } = MOCK_NEWEST[0];

const POST_MOCK = {
  author: {
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    workPlace: 'Адоніс',
  },
  createdAt: '27.11.2020',
  mainDirection,
  title: 'Ultrices eros in cursus',
  postType,
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
};

beforeEach(() => render(<PostPreviewCard data={POST_MOCK} />));

describe('PostPreviewCard', () => {
  it('renders name direction', () => {
    const renderedDirection = screen.getByText(
      mainDirection.name,
    );

    expect(renderedDirection).toBeInTheDocument();
  });

  it('renders name postType', () => {
    const renderedPostType = screen.getByText(
      postType.name,
    );
    expect(renderedPostType).toBeInTheDocument();
  });
});
