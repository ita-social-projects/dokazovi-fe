import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  InformationModal,
  IConfirmationModalWithButtonProps,
} from './InformationModal';

const PROPS_MOCK: IConfirmationModalWithButtonProps = {
  message: 'Test Message',
  // buttonText: 'Ok',
  // buttonIcon: <div>Close Icon</div>,
  loading: true,
  disabled: false,
  onClose: jest.fn(),
  isOpen: true,
};

const renderModal = () => {
  render(
    <InformationModal
      message={PROPS_MOCK.message}
      onClose={PROPS_MOCK.onClose}
      isOpen={PROPS_MOCK.isOpen}
      // buttonIcon={PROPS_MOCK.buttonIcon}
      // buttonText={PROPS_MOCK.buttonText}
    />,
  );
};

describe('InformationModal', () => {
  beforeEach(() => renderModal());
  it('render component and match snapshot', () => {
    const { asFragment } = render(
      <InformationModal
        message={PROPS_MOCK.message}
        onClose={PROPS_MOCK.onClose}
        isOpen={PROPS_MOCK.isOpen}
        // buttonIcon={PROPS_MOCK.buttonIcon}
        // buttonText={PROPS_MOCK.buttonText}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  // it('render close button', () => {
  //   expect(screen.getAllByRole('button')[0]).toHaveTextContent('Close Icon');
  // });
  // it('render Ok button', () => {
  //   expect(screen.getAllByRole('button')[1]).toHaveTextContent('Ok');
  // });
});

describe('InformationModal events', () => {
  it('should closes when close button is clicked', () => {
    const { asFragment } = render(
      <InformationModal
        // buttonIcon={PROPS_MOCK.buttonIcon}
        onClose={PROPS_MOCK.onClose}
        isOpen={PROPS_MOCK.isOpen}
        message={PROPS_MOCK.message}
        // buttonText={PROPS_MOCK.buttonText}
      />,
    );
    const closeBtn = screen.getByText('Закрити');
    userEvent.click(closeBtn);
    expect(asFragment()).toMatchSnapshot();
  });
  // it('should closes when Ok button is clicked', () => {
  //   const { asFragment } = render(
  //     <InformationModal
  //       // buttonIcon={PROPS_MOCK.buttonIcon}
  //       message={PROPS_MOCK.message}
  //       // buttonText={PROPS_MOCK.buttonText}
  //     />,
  //   );
  //   const closeBtn = screen.getByText('Ok');
  //   userEvent.click(closeBtn);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});

describe('InformationModal loading status', () => {
  it('render with loading icon', () => {
    const { asFragment } = render(
      <InformationModal
        message={PROPS_MOCK.message}
        onClose={PROPS_MOCK.onClose}
        isOpen={PROPS_MOCK.isOpen}
        // buttonIcon={PROPS_MOCK.buttonIcon}
        // buttonText={PROPS_MOCK.buttonText}
        loading
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
