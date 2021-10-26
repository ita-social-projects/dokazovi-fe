import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostDirectionItem } from '../PostDirectionItem';

const handleClickMock = jest.fn();

describe('Component renders correctly', () => {
  it('should render label name', () => {
    render(
      <PostDirectionItem
        labelName="Офтальмологія"
        handleClick={handleClickMock}
        isDisabledFilter={false}
        checked={true}
      />,
    );
    expect(screen.getByText('Офтальмологія')).toBeInTheDocument();
  });

  it('should call handleClick function by click', () => {
    const { container } = render(
      <PostDirectionItem
        labelName="Офтальмологія"
        handleClick={handleClickMock}
        isDisabledFilter={false}
        checked={true}
      />,
    );
    const element = container.firstElementChild;
    fireEvent.click(element);
    expect(handleClickMock).toHaveBeenCalled();
  });

  it('should be disabled with particular color', () => {
    render(
      <PostDirectionItem
        labelName="Офтальмологія"
        isDisabledFilter={true}
        checked={false}
      />,
    );
    expect(screen.getByText('Офтальмологія')).toHaveStyle('color: #767676');
  });
});
