import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoadMoreButton } from './LoadMoreButton';
import { LoadingStatusEnum, LoadMoreButtonTextType } from '../../types';

describe('loadMoreButton test', () => {
  it('rendering when it not last page', () => {
    render(
      <LoadMoreButton
        clicked={jest.fn()}
        textType={LoadMoreButtonTextType.EXPERT}
        loading={LoadingStatusEnum.succeeded}
        isLastPage={false}
        totalPages={2}
        totalElements={24}
        pageNumber={1}
      />,
    );
    expect(screen.getByText('Показати ще 12 авторів')).toBeInTheDocument();
  });
  it('rendering when it is last page', () => {
    const { asFragment } = render(
      <LoadMoreButton
        clicked={jest.fn()}
        textType={LoadMoreButtonTextType.POST}
        loading={LoadingStatusEnum.succeeded}
        isLastPage
        totalPages={1}
        totalElements={12}
        pageNumber={1}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('', () => {
    const loadMoreHandler = jest.fn();
    render(
      <LoadMoreButton
        clicked={loadMoreHandler}
        textType={LoadMoreButtonTextType.POST_BY_STATUS}
        loading={LoadingStatusEnum.succeeded}
        isLastPage={false}
        totalPages={2}
        totalElements={24}
        pageNumber={1}
      />,
    );
    const loadMore = screen.getByTestId('loadMore');
    userEvent.click(loadMore);
    expect(loadMoreHandler).toHaveBeenCalled();
  });
});
