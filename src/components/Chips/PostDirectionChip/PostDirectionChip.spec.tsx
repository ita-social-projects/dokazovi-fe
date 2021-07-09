import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PostDirectionChip } from './PostDirectionChip';

describe('PostDirectionChip', () => {
  it('should render the chip with correct class', () => {
    const { getByTestId } = render(<PostDirectionChip />);
    expect(getByTestId('chip')).toHaveClass(
      'PostDirectionChip-directionChip-1',
    );
  });
});

describe('events', () => {
  it('should delete the chip', () => {
    const handleDeleteMock = jest.fn();
    const { getByTestId, unmount, container } = render(
      <PostDirectionChip handleDelete={handleDeleteMock} />,
    );
    const deleteIcon = container.querySelector('.MuiChip-deleteIcon');
    const chip = getByTestId('chip');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fireEvent.click(deleteIcon);
    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    unmount();
    expect(chip).not.toBeInTheDocument();
  });

  it('should click on the chip', () => {
    const handleClickMock = jest.fn();
    const { getByTestId } = render(
      <PostDirectionChip handleClick={handleClickMock} />,
    );
    const chip = getByTestId('chip');
    fireEvent.click(chip);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
