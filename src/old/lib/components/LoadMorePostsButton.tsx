import React from 'react';
import { Button, Box } from '@material-ui/core';
import { LoadingStatusEnum } from '../types';

export interface ILoadMorePostsButtonProps {
  clicked: () => void;
  loading: LoadingStatusEnum;
  lastPageMsg?: string;
  isLastPage: boolean;
}

const LoadMorePostsButton: React.FC<ILoadMorePostsButtonProps> = ({
  clicked,
  loading,
  isLastPage,
  lastPageMsg = 'Більше нових матеріалів немає',
}) => {
  const renderLoadControls = (): JSX.Element => {
    let control: JSX.Element = <></>;

    if (loading === LoadingStatusEnum.succeeded) {
      control = (
        <Button
          variant="contained"
          onClick={() => {
            clicked();
          }}
        >
          Більше матеріалів
        </Button>
      );
    }

    if (isLastPage) {
      control = <span>{lastPageMsg}</span>;
    }

    return control;
  };
  return (
    <>
      <Box mt={2}>{renderLoadControls()}</Box>{' '}
    </>
  );
};

export default LoadMorePostsButton;
