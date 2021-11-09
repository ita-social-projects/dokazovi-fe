import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostDirectionChip, {
  IPostDirectionChipProps,
} from './PostDirectionChip';

const mocks: IPostDirectionChipProps = {
  labelName: 'Test Label Name',
};

describe('PostDirectionChip', () => {
  it('should render correctly when loading status is pending', () => {
    const { asFragment } = render(
      <PostDirectionChip labelName={mocks.labelName} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display correct label name', () => {
    render(<PostDirectionChip labelName={mocks.labelName} />);

    expect(screen.getByText('Test Label Name')).toBeInTheDocument();
  });
});

describe('PostDirectionChip Events', () => {
  it('should handle click on it by executing given function', () => {
    const handleClick = jest.fn();
    render(
      <PostDirectionChip
        labelName={mocks.labelName}
        handleClick={handleClick}
      />,
    );

    const label = screen.getByText('Test Label Name');
    userEvent.click(label);

    expect(handleClick).toBeCalledTimes(1);
  });
});
