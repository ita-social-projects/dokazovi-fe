import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { TextFieldWithDebounce } from '../TextFieldWithDebounce';

describe('TextFieldWithDebounce component tests', () => {
  it('should render TextFieldWithDebounce component', () => {
    const Wrapper = () => {
      const [value, setValue] = useState<string>('');
      expect(value).toBe('');
      return <TextFieldWithDebounce setInput={setValue} />;
    };
    const { asFragment } = render(<Wrapper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
