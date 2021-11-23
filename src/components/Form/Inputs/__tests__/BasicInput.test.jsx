import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BasicInput } from '../BasicInput';

jest.mock('axios');
jest.mock('request');

describe('BasicInput component tests', () => {
  it('should render BasicInput component', () => {
    const { asFragment } = render(<BasicInput />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render password type input', () => {
    const onChange = jest.fn();
    const typeMock = {
      type: 'password',
    };
    render(<BasicInput type={typeMock.type} onChange={onChange} />);

    userEvent.type(screen.getByTestId('basic-input'), 'mchsye34');

    expect(onChange).toHaveBeenCalledTimes(8);
  });

  it('should toggle visibility icon', async () => {
    const typeMock = {
      type: 'password',
    };
    render(<BasicInput type={typeMock.type} />);

    userEvent.type(screen.getByTestId('basic-input'), 'mchsye34');
    userEvent.click(screen.getByLabelText('toggle password visibility'));

    await waitFor(() =>
      expect(screen.getByTestId('visibility-off')).toBeInTheDocument(),
    );

    userEvent.click(screen.getByLabelText('toggle password visibility'));

    await waitFor(() =>
      expect(screen.getByTestId('visibility')).toBeInTheDocument(),
    );
  });
});
