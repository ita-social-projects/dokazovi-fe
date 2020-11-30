import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import MOCK_NEWEST from '../../../modules/main/components/constants/newestPosts-mock';

const { mainDirection, postType } = MOCK_NEWEST[0];

beforeEach(() => render(<PostPreviewCard data={MOCK_NEWEST[0]} />));

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
