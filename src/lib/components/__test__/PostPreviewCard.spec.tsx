import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import { DirectionEnum, PostTypeEnum } from '../../types';

const POST_MOCK = {
  author: {
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    workPlace: 'Адоніс',
  },
  createdAt: '27.11.2020',
  direction: DirectionEnum.VIROLOGY,
  title: 'Ultrices eros in cursus',
  postType: PostTypeEnum.VIDEO,
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
};

beforeEach(() => render(<PostPreviewCard data={POST_MOCK} />));

describe('PostPreviewCard', () => {
  it('renders name direction', () => {
    const renderedDirection = screen.getByText(POST_MOCK.direction);

    expect(renderedDirection).toBeInTheDocument();
  });

  it('renders name postType', () => {
    const renderedPostType = screen.getByText(POST_MOCK.postType);

    expect(renderedPostType).toBeInTheDocument();
  });
});
