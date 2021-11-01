import React from 'react';
import { render } from '@testing-library/react';
import Page404 from './Page404';

describe('Page404', () => {
  it('render component and match snapshot', () => {
    const { asFragment } = render(<Page404 />);
    expect(asFragment()).toMatchSnapshot();
  });
});
