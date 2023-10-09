import React from 'react';
import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { UserAccountButton } from '../UserAccountButton';

describe('Tests for UserAccountButton', () => {
  it('Should render UserAccountButton with activate type', () => {
    const { container } = render(
      <UserAccountButton type="activate" label="Hello world" />,
    );
    expect(container.firstChild).toHaveClass(
      'UserAccountButton-activateButton-2',
    );
  });
  it('Should render UserAccountButton with deactivate type', () => {
    const { container } = render(
      <UserAccountButton type="deactivate" label="Hello world" />,
    );

    expect(container.firstChild).toHaveClass(
      'UserAccountButton-deactivateButton-8',
    );
  });
  it('Should render UserAccountButton with create type', () => {
    const { container } = render(
      <UserAccountButton type="create" label="Hello world" />,
    );

    expect(container.firstChild).toHaveClass(
      'UserAccountButton-createButton-11',
    );
  });
  it('Should handle onClick', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <UserAccountButton
        type="activate"
        label="Hello world"
        onClick={handleClick}
      />,
    );
    userEvent.click(container.firstChild as TargetElement);
    expect(handleClick).toBeCalled();
  });

  it('Should not be active when disabled.', () => {
    const { container } = render(
      <UserAccountButton type="activate" label="Hello world" disabled />,
    );

    const button = container.firstChild as TargetElement;
    expect(button).toBeDisabled();
  });

  it('Should render label in the button', () => {
    const { container } = render(
      <UserAccountButton type="activate" label="Hello world" />,
    );
    const button = container.firstChild as TargetElement;
    expect(button).toHaveTextContent('Hello world');
  });
});
