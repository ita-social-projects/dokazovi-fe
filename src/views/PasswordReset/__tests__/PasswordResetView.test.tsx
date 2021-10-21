import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordResetView from '../PasswordResetView';
import { resetPasswordRequest } from '../../../old/lib/utilities/API/api';

jest.mock('../../../old/lib/utilities/API/api', () => ({
  resetPasswordRequest: jest.fn(),
}));

describe('PasswordResetView tests', () => {
  it('should PasswordResetView component render', async () => {
    const { asFragment } = render(<PasswordResetView />);

    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });

  it('should form be submitted and click in submittedView work correctly', async () => {
    const { asFragment, getByTestId } = render(<PasswordResetView />);

    const basicInput = getByTestId('basic-input');

    fireEvent.blur(basicInput);
    userEvent.type(basicInput, 'test@mail.com');
    expect(basicInput).toHaveValue('test@mail.com');

    expect(screen.queryByTestId('submittedContainer')).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Підтвердити зміни'));

    await waitFor(() =>
      expect(screen.getByTestId('submittedContainer')).toBeInTheDocument(),
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByText('Спробувати ще раз')).toBeInTheDocument();
    userEvent.click(screen.getByText('Спробувати ще раз'));

    await waitFor(() =>
      expect(screen.queryByText('Спробувати ще раз')).not.toBeInTheDocument(),
    );

    expect(resetPasswordRequest).toHaveBeenCalled();
  });
});
