import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NewestContainer } from '../NewestContainer';
import { mockNewestContent } from '../mockNewestContent';

jest.mock('../../../old/lib/utilities/API/api', () => ({
  getNewestPosts: () => Promise.resolve(mockNewestContent),
}));

describe('NewestContainer component', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <NewestContainer />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
