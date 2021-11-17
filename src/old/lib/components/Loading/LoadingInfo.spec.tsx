import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingInfo } from './LoadingInfo';
import { LoadingStatusEnum } from '../../types';

describe('LoadingInfo', () => {
  it('should render correctly when loading status is pending', () => {
    const { asFragment } = render(
      <LoadingInfo loading={LoadingStatusEnum.pending} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display error message when loading status is failed', () => {
    render(
      <LoadingInfo loading={LoadingStatusEnum.failed} errorMsg="Test Error" />,
    );

    expect(screen.getByText('Test Error')).toMatchSnapshot();
  });

  it('should be empty when loading status is succeeded', () => {
    const { container } = render(
      <LoadingInfo loading={LoadingStatusEnum.succeeded} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
