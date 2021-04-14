import React from 'react';
import {
  Button,
  Box,
  makeStyles,
  createStyles,
  CircularProgress,
} from '@material-ui/core';
import { LoadingStatusEnum } from '../types';
import { LOAD_POSTS_LIMIT } from '../constants/posts';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        marginTop: theme.spacing(8),
        backgroundColor: theme.palette.common.black,
        height: '44px',
        borderRadius: '300px',
        '& .MuiButton-label': {
          color: theme.palette.common.white,
          fontWeight: 500,
          fontSize: '16px',
        },
        '& .MuiCircularProgress-circle': {
          color: '#73DDFF',
        },
        '& .MuiCircularProgress-root': {
          marginRight: theme.spacing(2),
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: theme.palette.common.black,
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.common.black,
        },
      },
    }),
  { name: 'LoadMorePostsButton' },
);

export interface ILoadMorePostsButtonProps {
  clicked: () => void;
  loading: LoadingStatusEnum;
  isLastPage: boolean;
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

const LoadMorePostsButton: React.FC<ILoadMorePostsButtonProps> = ({
  clicked,
  loading,
  isLastPage,
  pageNumber,
  totalPages,
  totalElements,
}) => {
  const classes = useStyles();
  const renderLoadControls = (): JSX.Element => {
    let control: JSX.Element = <></>;
    const isPreLastPage = pageNumber !== totalPages - 2;
    const elemsInLastpage = totalElements % LOAD_POSTS_LIMIT;
    const elements = isPreLastPage ? LOAD_POSTS_LIMIT : elemsInLastpage;
    control = (
      <Button
        className={classes.root}
        variant="outlined"
        onClick={() => {
          clicked();
        }}
      >
        <CircularProgress
          variant={
            loading === LoadingStatusEnum.pending
              ? 'indeterminate'
              : 'determinate'
          }
          color="primary"
          value={80}
          size={25}
          thickness={5}
        />
        Показати ще {elements} матеріалів
      </Button>
    );

    if (isLastPage) {
      control = <></>;
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
