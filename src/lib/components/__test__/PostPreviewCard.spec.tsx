import React from 'react';
import { render, screen } from '@testing-library/react';
import PostPreviewCard from '../PostPreview/PostPreviewCard';
import MOCK_NEWEST from '../../../modules/main/components/constants/newestPosts-mock';
import { DIRECTION_PROPERTIES } from '../../constants/direction-properties';
import { postTypeProperties } from '../../constants/post-type-properties';

const { direction, postType } = MOCK_NEWEST[0];

beforeEach(() => render(<PostPreviewCard data={MOCK_NEWEST[0]} />));

describe('PostPreviewCard', () => {
  it('renders name direction', () => {
    const renderedDirection = screen.getByText(
      DIRECTION_PROPERTIES[direction].name,
    );

    expect(renderedDirection).toBeInTheDocument();
  });

  it('renders name postType', () => {
    const renderedPostType = screen.getByText(
      postTypeProperties[postType].name,
    );

    expect(renderedPostType).toBeInTheDocument();
  });
});
