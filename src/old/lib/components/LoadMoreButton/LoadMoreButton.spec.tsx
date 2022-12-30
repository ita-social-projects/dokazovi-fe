import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import userEvent from '@testing-library/user-event';
import { LoadMoreButton } from './LoadMoreButton';
import { LoadingStatusEnum, LoadMoreButtonTextType } from '../../types';
import { MAIN_THEME } from '../../../../styles/theme';

describe('loadMoreButton test', () => {
  it('rendering when it not last page', () => {
    render(
      <ThemeProvider theme={MAIN_THEME}>
        <LoadMoreButton
          clicked={jest.fn()}
          textType={LoadMoreButtonTextType.EXPERT}
          loading={LoadingStatusEnum.succeeded}
          isLastPage={false}
          totalPages={2}
          totalElements={24}
          pageNumber={1}
        />
      </ThemeProvider>,
    );
    expect(screen.getByText('Показати ще 12 авторів')).toBeInTheDocument();
  });
  it('rendering when it is last page', () => {
    const { asFragment } = render(
      <ThemeProvider theme={MAIN_THEME}>
        <LoadMoreButton
          clicked={jest.fn()}
          textType={LoadMoreButtonTextType.POST}
          loading={LoadingStatusEnum.succeeded}
          isLastPage
          totalPages={1}
          totalElements={12}
          pageNumber={1}
        />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call function after click', () => {
    const loadMoreHandler = jest.fn();
    render(
      <ThemeProvider theme={MAIN_THEME}>
        <LoadMoreButton
          clicked={loadMoreHandler}
          textType={LoadMoreButtonTextType.POST_BY_STATUS}
          loading={LoadingStatusEnum.succeeded}
          isLastPage={false}
          totalPages={2}
          totalElements={24}
          pageNumber={1}
        />
      </ThemeProvider>,
    );
    const loadMore = screen.getByTestId('loadMore');
    userEvent.click(loadMore);
    expect(loadMoreHandler).toHaveBeenCalled();
  });
});
