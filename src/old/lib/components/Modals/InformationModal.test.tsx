import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  InformationModal,
  IConfirmationModalWithButtonProps,
} from './InformationModal';

const PROPS_MOCK: IConfirmationModalWithButtonProps = {
  message: 'Test Message',
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
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('InformationModal events', () => {
  it('should closes when close button is clicked', () => {
    const { asFragment } = render(
      <InformationModal
        onClose={PROPS_MOCK.onClose}
        isOpen={PROPS_MOCK.isOpen}
        message={PROPS_MOCK.message}
      />,
    );
    const closeBtn = screen.getByText('Закрити');
    userEvent.click(closeBtn);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('InformationModal loading status', () => {
  it('render with loading icon', () => {
    const { asFragment } = render(
      <InformationModal
        message={PROPS_MOCK.message}
        onClose={PROPS_MOCK.onClose}
        isOpen={PROPS_MOCK.isOpen}
        loading
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
