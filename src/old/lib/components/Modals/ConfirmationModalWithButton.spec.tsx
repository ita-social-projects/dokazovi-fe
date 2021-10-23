import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ConfirmationModalWithButton,
  IConfirmationModalWithButtonProps,
} from './ConfirmationModalWithButton';

const PROPS_MOCK: IConfirmationModalWithButtonProps = {
  message: 'Test Message',
  buttonText: 'Open Modal',
  buttonIcon: <div>Open Icon</div>,
  onConfirmButtonClick: () => null,
};

const renderAndOpenModal = () => {
  render(
    <ConfirmationModalWithButton
      message={PROPS_MOCK.message}
      buttonText={PROPS_MOCK.buttonText}
      onConfirmButtonClick={PROPS_MOCK.onConfirmButtonClick}
    />,
  );

  const openBtn = screen.getByText('Open Modal');
  userEvent.click(openBtn);
};

describe('ConfirmationModalWithButton', () => {
  beforeEach(() => renderAndOpenModal());

  it('should render correctly and match the snapshot', () => {
    const { asFragment } = render(
      <ConfirmationModalWithButton
        message={PROPS_MOCK.message}
        buttonText={PROPS_MOCK.buttonText}
        buttonIcon={PROPS_MOCK.buttonIcon}
        onConfirmButtonClick={PROPS_MOCK.onConfirmButtonClick}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display correct message when opened', () => {
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should has confirmation button when opened', () => {
    expect(screen.getByText('Так')).toBeInTheDocument();
  });

  it('should has cancellation button when opened', () => {
    expect(screen.getByText('Ні')).toBeInTheDocument();
  });
});

describe('ConditionsNav Events', () => {
  it('should open when icon button icon is clicked', () => {
    const { container } = render(
      <ConfirmationModalWithButton
        message={PROPS_MOCK.message}
        buttonText={PROPS_MOCK.buttonText}
        buttonIcon={PROPS_MOCK.buttonIcon}
        onConfirmButtonClick={PROPS_MOCK.onConfirmButtonClick}
      />,
    );
    const openIcon = screen.getByText('Open Modal');
    userEvent.click(openIcon);

    expect(container).toMatchSnapshot();
  });

  it('should execute given function when confirmation button is clicked', () => {
    const confirmHandleMock = jest.fn();
    render(
      <ConfirmationModalWithButton
        message={PROPS_MOCK.message}
        buttonText={PROPS_MOCK.buttonText}
        onConfirmButtonClick={confirmHandleMock}
      />,
    );
    const openBtn = screen.getByText('Open Modal');
    userEvent.click(openBtn);

    const confirmationBtn = screen.getByText('Так');
    userEvent.click(confirmationBtn);

    expect(confirmHandleMock).toHaveBeenCalledTimes(1);
  });

  it('should close when decline button is clicked', () => {
    const { asFragment } = render(
      <ConfirmationModalWithButton
        message={PROPS_MOCK.message}
        buttonText={PROPS_MOCK.buttonText}
        onConfirmButtonClick={PROPS_MOCK.onConfirmButtonClick}
      />,
    );
    const openBtn = screen.getByText('Open Modal');
    userEvent.click(openBtn);

    const confirmationBtn = screen.getByText('Ні');
    userEvent.click(confirmationBtn);

    expect(asFragment()).toMatchSnapshot();
  });
});
