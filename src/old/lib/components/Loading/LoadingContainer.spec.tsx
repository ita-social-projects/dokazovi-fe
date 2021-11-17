import React from 'react';
import { render } from '@testing-library/react';
import { ILoadingContainerProps, LoadingContainer } from './LoadingContainer';
import { LoadingStatusEnum } from '../../types';

const PROPS_MOCK: ILoadingContainerProps = {
  loading: LoadingStatusEnum.idle,
  expand: false,
};

describe('LoadingContainer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <LoadingContainer loading={PROPS_MOCK.loading} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
