import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { SkeletonPostPreviewCard } from './SkeletonPostPreviewCard';

beforeEach(() =>
  render(
    <MemoryRouter>
      <SkeletonPostPreviewCard />
    </MemoryRouter>,
  ),
);

describe('SkeletonPostPreviewCard', () => {
  it('renders the component', () => {
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
