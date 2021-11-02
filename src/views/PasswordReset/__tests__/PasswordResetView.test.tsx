import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordResetView from '../PasswordResetView';
import * as api from '../../../old/lib/utilities/API/api';

describe('PasswordResetView tests', () => {
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

  /* it('should render previous step', async () => {
    const resetPasswordRequest = jest.spyOn(api, 'resetPasswordRequest');

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
    expect(resetPasswordRequest).toHaveBeenCalled();
  }); */
});
