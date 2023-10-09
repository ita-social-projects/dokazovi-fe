import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUserAccountForm } from '../CreateUserAccountForm';

describe('Tests for CreateUserAccountForm', () => {
  it('Should render CreateUserAccountForm', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CreateUserAccountForm
        email="hello@gmail.com"
        usersEmails={['hello2@gmail.com']}
        onClick={handleClick}
      />,
    );
    expect(container.firstChild).toHaveClass('CreateUserAccountForm-Form-2');
  });

  it('Should be able to write text in input', () => {
    const handleClick = jest.fn();
    render(
      <CreateUserAccountForm
        email="hello@gmail.com"
        usersEmails={['hello2@gmail.com']}
        onClick={handleClick}
      />,
    );

    const input = screen.getByTestId('createAccountInput') as HTMLInputElement;
    userEvent.type(input, 'test@gmail.com');
    expect(input.value).toBe('test@gmail.com');
  });

  it('Should display errors when email is incorrect', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CreateUserAccountForm
        email="hello@gmail.com"
        usersEmails={['hello2@gmail.com']}
        onClick={handleClick}
      />,
    );

    const input = screen.getByTestId('createAccountInput') as HTMLInputElement;
    userEvent.type(input, 'hello world');
    expect(container).toHaveTextContent('Неправильна email адреса');

    userEvent.clear(input);
    userEvent.type(input, 'hello@gmail.com');
    expect(container).toHaveTextContent(
      'Пошта для акаунту має відрізнятися від публічної пошти',
    );

    userEvent.clear(input);
    userEvent.type(input, 'hello2@gmail.com');
    expect(container).toHaveTextContent(
      'За цією поштою вже зареєстрований користувач',
    );
  });

  it('Button should be disabled till correct email will be written in input', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CreateUserAccountForm
        email="hello@gmail.com"
        usersEmails={['hello2@gmail.com']}
        onClick={handleClick}
      />,
    );

    const input = screen.getByTestId('createAccountInput') as HTMLInputElement;
    userEvent.click(input);
    expect(container).toHaveTextContent('Поле не може бути порожнім');

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    userEvent.type(input, 'hello@gmail.com');
    expect(button).toBeDisabled();

    userEvent.clear(input);
    userEvent.type(input, 'test@gmail.com');
    expect(button).not.toBeDisabled();
  });
});
