import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { CancelButton } from '../CancelButton';

describe('Test for CancelButton component', () => {
  it('Should render a button', () => {
    const { container } = render(<CancelButton label="Hello world" />);
    expect(container.firstChild).toHaveClass('CancelButton-cancelButton-1');
  });

  it('Should render a label properly', () => {
    render(<CancelButton label="Hello world" />);
    const label = screen.getByText('Hello world');

    expect(label).toBeInTheDocument();
  });

  it('Should handle onClick', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CancelButton label="Hello World" onClick={handleClick} />,
    );
    userEvent.click(container.firstChild as TargetElement);
    expect(handleClick).toBeCalled();
  });
});
