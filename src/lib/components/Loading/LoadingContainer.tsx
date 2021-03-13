import { Grid } from '@material-ui/core';
import React from 'react';
import { LoadingStatusEnum } from '../../types';
import { useStyles } from './LoadingContainer.styles';
import LoadingInfo from './LoadingInfo';

export interface ILoadingContainerProps {
  loading: LoadingStatusEnum;
  errorMsg?: string;
}

const LoadingContainer: React.FC<ILoadingContainerProps> = (props) => {
  const { loading, errorMsg } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {loading === LoadingStatusEnum.pending && (
        <LoadingInfo loading={loading} errorMsg={errorMsg} />
      )}
    </Grid>
  );
};

export default LoadingContainer;
