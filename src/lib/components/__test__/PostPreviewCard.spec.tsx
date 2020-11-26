import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import MOCK_NEWEST from '../../../modules/main/components/constants/newestPosts-mock';
import { DIRECTION_PROPERTIES } from '../PostPreview/direction-properties';
import { postTypeProperties } from '../PostPreview/post-type-properties';

const { direction, postType } = MOCK_NEWEST[0];

beforeEach(() => render(<PostPreviewCard data={MOCK_NEWEST[0]} />));

describe('PostPreviewCard', () => {
  it('renders cyrillic direction', () => {
    const renderedDirection = screen.getByText(
      DIRECTION_PROPERTIES[direction].cyrillic,
    );

    expect(renderedDirection).toBeInTheDocument();
  });

  it('renders cyrillic postType', () => {
    const renderedPostType = screen.getByText(
      postTypeProperties[postType].cyrillic,
    );

    expect(renderedPostType).toBeInTheDocument();
  });
});
