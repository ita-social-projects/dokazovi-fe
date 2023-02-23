import React, { FC, useState } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { LoadingStatusType, LoadingStatusEnum, IExpert } from 'old/lib/types';
import UpButton from 'old/lib/components/UpButton/UpButton';
import { useStyles } from '../styles/ExpertsViewMobile.styles';
import { ExpertsList } from '../../../lib/components/Experts/ExpertsList';

interface IExpertsViewMobileProps {
  page: number;
  header: string;
  loading: LoadingStatusType;
  experts: IExpert[];
  totalElements: number;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
  setPage: () => void;
  LoadMoreButton: JSX.Element;
}

const ExpertsViewMobile: FC<IExpertsViewMobileProps> = ({
  page,
  header,
  loading,
  experts,
  totalElements,
  SelectedTypes,
  FilterCheckboxes,
  setPage,
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
            <ExpertsList experts={experts} />
            <Grid container justifyContent="center">
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

export default ExpertsViewMobile;
