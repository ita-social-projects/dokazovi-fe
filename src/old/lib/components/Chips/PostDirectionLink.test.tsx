import React from 'react';
import { render } from '@testing-library/react';
import PostDirectionLink, {
  IPostDirectionLinkProps,
} from './PostDirectionLink';

const mocks: IPostDirectionLinkProps = {
  direction: {
    id: 1,
    name: 'Test Name',
  },
};

describe('PostDirectionLink', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <PostDirectionLink direction={mocks.direction} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
