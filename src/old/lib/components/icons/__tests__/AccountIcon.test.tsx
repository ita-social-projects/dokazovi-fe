import React from 'react';
import { render } from '@testing-library/react';
import { AccountIcon } from '../AccountIcon';

describe('AccountIcon test', () => {
  it('should render component and match snapshot', () => {
    const { asFragment } = render(<AccountIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
