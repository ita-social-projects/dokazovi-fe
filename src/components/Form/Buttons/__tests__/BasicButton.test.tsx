import userEvent, { TargetElement } from '@testing-library/user-event';
import React from 'react';
import { render } from '@testing-library/react';
import { BasicButton } from '../BasicButton';

describe('Test for BasicButton component.', () => {
  it('Should renders a BasicButton with accept type.', () => {
    const { container } = render(<BasicButton type="accept" />);

    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('BasicInput-basicAcceptButton-1');
  });

  it('Should renders a BasicButton with sign type.', () => {
    const { container } = render(<BasicButton type="sign" />);

    expect(container.firstChild).toHaveClass('BasicInput-basicSignButton-4');
  });

  it('Should handle onClick', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <BasicButton type="accept" onClick={handleClick} />,
    );
    userEvent.click(container.firstChild as TargetElement);
    expect(handleClick).toBeCalled();
  });

  it('Should not be active when disabled.', () => {
    const { container } = render(<BasicButton type="accept" disabled />);

    const button = container.firstChild as TargetElement;
    expect(button).toBeDisabled();
  });

  it('Should be label in the button', () => {
    const label = 'text';
    const { container } = render(<BasicButton type="accept" label={label} />);
    const button = container.firstChild as TargetElement;
    expect(button).toHaveTextContent(label);
  });
});
