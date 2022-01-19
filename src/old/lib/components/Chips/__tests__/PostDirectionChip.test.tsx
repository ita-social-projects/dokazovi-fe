import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostDirectionChip from '../PostDirectionChip';

const handleClickMock = jest.fn();

describe('PostDirectionChip test', () => {
  it('should render PostDirectionChip component and match snapshot', () => {
    const { asFragment } = render(
      <PostDirectionChip
        labelName="Офтальмологія"
        handleClick={handleClickMock}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call handleClick function', () => {
    render(
      <PostDirectionChip
        labelName="Офтальмологія"
        handleClick={handleClickMock}
      />,
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(handleClickMock).toHaveBeenCalled();
  });
});
