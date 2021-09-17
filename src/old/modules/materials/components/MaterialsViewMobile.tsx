import React, { FC, useState } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import { PostsList } from 'old/lib/components/Posts/PostsList';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { useTranslation } from 'react-i18next';
import { IPost, LoadingStatusType, LoadingStatusEnum } from 'old/lib/types';
import { useStyles } from '../styles/MaterialsViewMobile.styles';
import { langTokens } from '../../../../locales/localizationInit';

interface IMaterialsViewMobileProps {
  page: number;
  loading: LoadingStatusType;
  materials: IPost[];
  totalElements: number;
  resetPage: () => void;
  selectedTypes: JSX.Element;
  filterCheckboxes: JSX.Element | false;
}

const MaterialsViewMobile: FC<IMaterialsViewMobileProps> = ({
  page,
  loading,
  materials,
  totalElements,
  resetPage,
  selectedTypes,
  filterCheckboxes,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

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
      <FiltersButton
        filtersMenuOpen={filtersMenuOpen}
        setFiltersMenuOpen={setFiltersMenuOpen}
      />
      <FiltersMenu
        filtersMenuOpen={filtersMenuOpen}
        setFiltersMenuOpen={setFiltersMenuOpen}
        totalElements={totalElements}
        selectedTypes={selectedTypes}
        filterCheckboxes={filterCheckboxes}
      />
    </Container>
  );
};

export default MaterialsViewMobile;
