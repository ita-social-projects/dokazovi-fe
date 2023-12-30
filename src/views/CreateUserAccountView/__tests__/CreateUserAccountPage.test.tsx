import { act, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CreateUserAccountPage from '../CreateUserAccountPage';

// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn().mockReturnValue({
//     pathname: '/another-route',
//     search: 'token=313131314ada',
//     hash: '',
//     state: null,
//     key: '5nvxpbdafa',
//   }),
//   useHistory: () => ({
//     push: jest.fn(),
//   }),
// }));
//
// jest.mock('../../../old/lib/hooks/useQuery', () => ({
//   useQuery: jest.fn(() => {
//     const mockLocation = {
//       search: '?param1=value1&param2=value2',
//     };
//     return new URLSearchParams(mockLocation.search);
//   }),
// }));

describe('Tests for CreateUserAccountPage', () => {
  it('Should be able to type into inputs', () => {
    render(
      <MemoryRouter>
        <CreateUserAccountPage />
      </MemoryRouter>,
    );

    const firstInput = document.querySelector(
      'input[name="newPassword"]',
    ) as HTMLInputElement;
    const secondInput = document.querySelector(
      'input[name="matchPassword"]',
    ) as HTMLInputElement;
    act(() => {
      userEvent.type(firstInput, '1234');
    });
    expect(firstInput.value).toBe('1234');

    act(() => {
      userEvent.type(secondInput, '12345');
    });
    expect(secondInput.value).toBe('12345');
  });

  it('Button should be disabled till correct passwords will be written in inputs', async () => {
    render(
      <MemoryRouter>
        <CreateUserAccountPage />
      </MemoryRouter>,
    );

    const firstInput = document.querySelector(
      'input[name="newPassword"]',
    ) as HTMLInputElement;
    const secondInput = document.querySelector(
      'input[name="matchPassword"]',
    ) as HTMLInputElement;

    const button = screen.getByRole('button', { name: 'Підтвердити зміни' });

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(firstInput, '1234');
    });

    expect(button).toBeDisabled();

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(secondInput, '1234');
    });

    expect(button).toBeDisabled();

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(firstInput, '1234');
      userEvent.type(secondInput, '1234');
    });
    expect(button).not.toBeDisabled();
  });

  it('Should handle input errors', async () => {
    const { container } = render(
      <MemoryRouter>
        <CreateUserAccountPage />
      </MemoryRouter>,
    );

    const firstInput = document.querySelector(
      'input[name="newPassword"]',
    ) as HTMLInputElement;
    const secondInput = document.querySelector(
      'input[name="matchPassword"]',
    ) as HTMLInputElement;

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(firstInput, '1234');
      userEvent.type(secondInput, '1234');
    });

    expect(container).toHaveTextContent(
      'Пароль повинен містити щонайменше 8 символів',
    );

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.type(firstInput, '1234');
      userEvent.type(secondInput, '12345');
    });

    expect(container).toHaveTextContent('Паролі не збігаються');

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.clear(firstInput);
      userEvent.clear(secondInput);
      userEvent.type(firstInput, '1234567891234567891234567');
      userEvent.type(secondInput, '1234567891234567891234567');
    });

    expect(container).toHaveTextContent(
      'Пароль повинен містити щонайбільше 24 символи',
    );

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      userEvent.clear(firstInput);
      userEvent.clear(secondInput);
      userEvent.click(firstInput);
      userEvent.click(secondInput);
    });

    expect(container).toHaveTextContent("Це поле є обов'язковим");
  });
});
