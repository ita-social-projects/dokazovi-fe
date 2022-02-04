import React, { FC, useState } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { LoadingStatusType, LoadingStatusEnum, IExpert } from 'old/lib/types';
import { useStyles } from '../styles/ExpertsViewMobile.styles';
import { AutoPaginationExpertsList } from './AutoPaginationExpertsList';

interface IExpertsViewMobileProps {
  page: number;
  header: string;
  loading: LoadingStatusType;
  experts: IExpert[];
  totalElements: number;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
  setPage: () => void;
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
          <AutoPaginationExpertsList experts={experts} setPage={setPage} />
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
        SelectedTypes={SelectedTypes}
        FilterCheckboxes={FilterCheckboxes}
      />
    </Container>
  );
};

export default ExpertsViewMobile;
