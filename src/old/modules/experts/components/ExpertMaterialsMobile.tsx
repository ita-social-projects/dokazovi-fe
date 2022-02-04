import React, { FC, useState } from 'react';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import { PostsList } from 'old/lib/components/Posts/PostsList';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import UpButton from 'old/lib/components/UpButton/UpButton';
import { Container, Grid } from '@material-ui/core';
import {
  IPost,
  LoadingStatusType,
  LoadingStatusEnum,
  IExpert,
} from 'old/lib/types';
import ExpertInfo from './ExpertInfo';

interface IExpertMaterialsMobileProps {
  page: number;
  loading: LoadingStatusType;
  materials: IPost[];
  totalElements: number;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
  LoadMoreButton: JSX.Element;
  expert: IExpert;
  resetPage: () => void;
}
const ExpertMaterialsMobile: FC<IExpertMaterialsMobileProps> = ({
  expert,
  totalElements,
  FilterCheckboxes,
  SelectedTypes,
  page,
  loading,
  materials,
  resetPage,
  LoadMoreButton,
}) => {
  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
  return (
    <Container>
      <ExpertInfo expert={expert} />
      <Grid item container alignItems="center" xs={12} direction="column">
        {page === 0 && loading === LoadingStatusEnum.pending ? (
          <LoadingContainer loading={LoadingStatusEnum.pending} expand />
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

export default ExpertMaterialsMobile;
