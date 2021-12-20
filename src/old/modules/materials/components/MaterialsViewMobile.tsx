import React, { FC, useState } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import { PostsList } from 'old/lib/components/Posts/PostsList';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { IPost, LoadingStatusType, LoadingStatusEnum } from 'old/lib/types';
import UpButton from 'old/lib/components/UpButton/UpButton';
import { useStyles } from '../styles/MaterialsViewMobile.styles';

interface IMaterialsViewMobileProps {
  page: number;
  header: string;
  loading: LoadingStatusType;
  materials: IPost[];
  totalElements: number;
  resetPage: () => void;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
  LoadMoreButton: JSX.Element;
}

const MaterialsViewMobile: FC<IMaterialsViewMobileProps> = ({
  page,
  header,
  loading,
  materials,
  totalElements,
  resetPage,
  SelectedTypes,
  FilterCheckboxes,
  LoadMoreButton,
}) => {
  const classes = useStyles();

  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

  return (
    <Container className={classes.container}>
      <Box className={classes.headerContainer}>
        <Typography component="span" className={classes.divider} />
        <Typography component="p" className={classes.header}>
          {header}
        </Typography>
        <Typography component="span" className={classes.divider} />
      </Box>
      <Grid item container alignItems="center" xs={12} direction="column">
        {page === 0 && loading === LoadingStatusEnum.pending ? (
          <LoadingContainer loading={loading} expand />
        ) : (
          <>
            <PostsList postsList={materials} resetPage={resetPage} mobile />
            <Grid container justify="center">
              {LoadMoreButton}
            </Grid>
          </>
        )}
      </Grid>
      <UpButton />
      <FiltersButton
        filtersMenuOpen={filtersMenuOpen}
        setFiltersMenuOpen={setFiltersMenuOpen}
      />
      <FiltersMenu
        filtersMenuOpen={filtersMenuOpen}
        setFiltersMenuOpen={setFiltersMenuOpen}
        totalElements={totalElements}
        SelectedTypes={SelectedTypes}
        FilterCheckboxes={FilterCheckboxes}
      />
    </Container>
  );
};

export default MaterialsViewMobile;
