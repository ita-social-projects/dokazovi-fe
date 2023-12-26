import { act, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import CreateUserAccountPage from '../CreateUserAccountPage';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: 'token=313131314ada',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../../old/lib/hooks/useQuery', () => ({
  useQuery: jest.fn(() => {
    const mockLocation = {
      search: '?param1=value1&param2=value2',
    };
    return new URLSearchParams(mockLocation.search);
  }),
}));

describe('Tests for CreateUserAccountPage', () => {
  it('Should render CreateUserAccountPage', () => {
    const { container } = render(<CreateUserAccountPage />);
    expect(container.firstChild?.firstChild).toHaveClass(
      'CreateUserAccountPage-FormBox-1',
    );
  });
  it('Should be able to type into inputs', async () => {
    render(<CreateUserAccountPage />);

    const inputs = screen.queryAllByTestId('basic-input') as HTMLInputElement[];
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[0], '1234');
    });
    expect(inputs[0].value).toBe('1234');

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[1], '12345');
    });
    expect(inputs[1].value).toBe('12345');
  });

  it('Button should be disabled till correct passwords will be written in inputs', async () => {
    render(<CreateUserAccountPage />);

    const inputs = screen.queryAllByTestId('basic-input') as HTMLInputElement[];

    const button = screen.getByTestId('basic-button');

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[0], '1234');
    });

    expect(button).toBeDisabled();

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[1], '1234');
    });

    expect(button).toBeDisabled();

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[0], '1234');
      userEvent.type(inputs[1], '1234');
    });
    expect(button).not.toBeDisabled();
  });

  it('Should handle input errors', async () => {
    const { container } = render(<CreateUserAccountPage />);

    const inputs = screen.queryAllByTestId('basic-input') as HTMLInputElement[];

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[0], '1234');
      userEvent.type(inputs[1], '1234');
    });

    expect(container).toHaveTextContent(
      'Пароль повинен містити щонайменше 8 символів',
    );

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(inputs[0], '1234');
      userEvent.type(inputs[1], '12345');
    });

    expect(container).toHaveTextContent('Паролі не збігаються');

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.clear(inputs[0]);
      userEvent.clear(inputs[0]);
      userEvent.type(inputs[0], '1234567891234567891234567');
      userEvent.type(inputs[1], '1234567891234567891234567');
    });

    expect(container).toHaveTextContent(
      'Пароль повинен містити щонайбільше 24 символи',
    );

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.clear(inputs[0]);
      userEvent.clear(inputs[0]);
      userEvent.click(inputs[0]);
      userEvent.click(inputs[1]);
    });

    expect(container).toHaveTextContent("Це поле є обов'язковим");
  });
});
