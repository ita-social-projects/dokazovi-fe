import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordResetView from '../PasswordResetView';
import { resetPasswordRequest } from '../../../old/lib/utilities/API/api';

jest.mock('../../../old/lib/utilities/API/api', () => ({
  resetPasswordRequest: jest.fn(),
}));

describe('PasswordResetView tests', () => {
  it('should PasswordResetView component render', async () => {
    const { asFragment } = render(<PasswordResetView />);
    await waitFor(() => {
      expect(screen.getByTestId('password-reset-view')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render success view', async () => {
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
