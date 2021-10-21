import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordResetView from '../PasswordResetView';

describe('PasswordResetView tests', () => {
  it('should PasswordResetView component render', () => {
    const { asFragment } = render(<PasswordResetView />);

    expect(asFragment()).toMatchSnapshot();
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
  });
});
