import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PasswordResetView from '../PasswordResetView';
import * as api from '../../../old/lib/utilities/API/api';

describe('PasswordResetView tests', () => {
  beforeEach(() => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onPost('/user/reset-password').reply(200, {});
  });

  it('should PasswordResetView component render', async () => {
    const { asFragment } = render(<PasswordResetView />);

    expect(
      await screen.findByTestId('password-reset-view'),
    ).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render success view', async () => {
    const resetPasswordRequest = jest.spyOn(api, 'resetPasswordRequest');

    const { getByTestId } = render(<PasswordResetView />);

    const basicInput = getByTestId('basic-input');

    fireEvent.blur(basicInput);
    userEvent.type(basicInput, 'test@mail.com');

    expect(screen.queryByTestId('submittedContainer')).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Підтвердити зміни'));

    await waitFor(() =>
      expect(screen.getByTestId('submittedContainer')).toBeInTheDocument(),
    );

    expect(resetPasswordRequest).toHaveBeenCalled();
  });

  it('should render previous step', async () => {
    const { getByTestId } = render(<PasswordResetView />);

    const basicInput = getByTestId('basic-input');

    fireEvent.blur(basicInput);
    userEvent.type(basicInput, 'test@mail.com');
    userEvent.click(screen.getByText('Підтвердити зміни'));

    await waitFor(() =>
      expect(screen.getByText('Спробувати ще раз')).toBeInTheDocument(),
    );

    userEvent.click(screen.getByText('Спробувати ще раз'));

    await waitFor(() =>
      expect(screen.queryByText('Спробувати ще раз')).not.toBeInTheDocument(),
    );
  });
});
