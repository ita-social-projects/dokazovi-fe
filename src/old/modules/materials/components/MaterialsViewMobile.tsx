import React, { FC } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import { PostsList } from 'old/lib/components/Posts/PostsList';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { useTranslation } from 'react-i18next';
import { IPost, LoadingStatusType, LoadingStatusEnum } from 'old/lib/types';
import { useStyles } from '../styles/MaterialsViewMobile.styles';
import { langTokens } from '../../../../locales/localizationInit';

interface IProps {
  page: number;
  loading: LoadingStatusType;
  materials: IPost[];
  resetPage: () => void;
}

const MaterialsViewMobile: FC<IProps> = ({
  page,
  loading,
  materials,
  resetPage,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container className={classes.container}>
      <Box className={classes.headerContainer}>
        <Typography component="span" className={classes.divider} />
        <Typography component="p" className={classes.header}>
          {t(langTokens.common.materials)}
        </Typography>
        <Typography component="span" className={classes.divider} />
      </Box>
      <Grid item container alignItems="center" xs={12} direction="column">
        {page === 0 && loading === LoadingStatusEnum.pending ? (
          <LoadingContainer loading={loading} expand />
        ) : (
          <>
            <PostsList postsList={materials} resetPage={resetPage} mobile />
          </>
        )}
      </Grid>
      <FiltersButton />
    </Container>
  );
};

export default MaterialsViewMobile;
