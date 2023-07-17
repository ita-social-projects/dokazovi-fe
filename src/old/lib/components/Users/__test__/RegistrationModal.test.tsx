import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegistrationModal } from '../RegistrationModal';

const PROPS_MOCK = {
  registrationOpen: true,
  onRegistrationClose: jest.fn(),
  showErrorMessage: jest.fn(),
};

const correctFormData: string[] = [
  'Petro',
  'Petrenko',
  'testemail@gmail.com',
  'testpassword',
  'testpassword',
];
const incorrectFormData: string[] = [
  'Petro',
  'Petrenko',
  'testemail@gmail.com',
  'testpassword',
  'sssssssssss',
];

const passFormData = (data: string[]) => {
  const inputs = screen
    .getAllByTestId('form-input')
    .map((input) => input.querySelector('input') as HTMLInputElement);
  inputs.forEach((input, i) => {
    fireEvent.change(input, { target: { value: data[i] } });
  });
};

const submitForm = () => {
  const submitButton = screen.getByTestId('submit-button');
  fireEvent.submit(submitButton);
};

describe('RegistrationModal tests', () => {
  beforeEach(() => {
    render(
      <RegistrationModal
        registrationOpen={PROPS_MOCK.registrationOpen}
        onRegistrationClose={PROPS_MOCK.onRegistrationClose}
        showErrorMessage={PROPS_MOCK.showErrorMessage}
      />,
    );
  });

  it('should render RegistrationModal component', () => {
    const inputs = screen.getAllByTestId('form-input');
    expect(inputs).toHaveLength(5);
  });

  // it('should submit registration form', async () => {
  //   passFormData(correctFormData);
  //   submitForm();
  //   await waitFor(() => {
  //     expect(PROPS_MOCK.onRegistrationClose).not.toHaveBeenCalled();
  //   });
  // });

  it('should show password by clicking button on password input', async () => {
    passFormData(correctFormData);
    const showPasswordButtons = screen.getAllByRole('button', {
      name: 'toggle password visibility',
    });
    showPasswordButtons.forEach((button) => fireEvent.click(button));
    expect(await screen.findAllByDisplayValue('testpassword')).toHaveLength(2);
  });

  it('should not submit form with non-matched password', async () => {
    passFormData(incorrectFormData);
    submitForm();
    await waitFor(() => {
      expect(PROPS_MOCK.showErrorMessage).toHaveBeenCalled();
    });
  });
});
