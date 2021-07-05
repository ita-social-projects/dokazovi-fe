import React from 'react';
import renderer from 'react-test-renderer';
import { SkeletonPostPreviewCard } from './SkeletonPostPreviewCard';

describe('SkeletonPostPreviewCard', () => {
  it('renders the component', () => {
    const tree = renderer.create(<SkeletonPostPreviewCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
