import React, { FC, useState } from 'react';
import ExpertInfo from './ExpertInfo';
import FiltersMenu from 'components/FiltersMenuMobile/FiltersMenu';
import { PostsList } from 'old/lib/components/Posts/PostsList';
import FiltersButton from 'old/lib/components/FiltersButton/FiltersButton';
import { LoadingContainer } from 'old/lib/components/Loading/LoadingContainer';
import UpButton from 'old/lib/components/UpButton/UpButton';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import {
  IPost,
  LoadingStatusType,
  LoadingStatusEnum,
  IExpert,
} from 'old/lib/types';
import { useStyles } from '../styles/ExpertMaterialsMobile.styles';
import TopSection from 'components/Posts/TopSection/TopSection';

interface IExpertMaterialsMobileProps {
  page: number;
  header: string;
  loading: LoadingStatusType;
  materials: IPost[];
  totalElements: number;
  //   resetPage: () => void;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
  //   LoadMoreButton: JSX.Element;
  expert: IExpert;
  setPage: () => void;
}
const ExpertMaterialsMobile: FC<IExpertMaterialsMobileProps> = ({
  expert,
  totalElements,
  FilterCheckboxes,
  SelectedTypes,
  header,
  page,
  loading,
  materials,
  setPage,
}) => {
  const classes = useStyles();

  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
  return (
    <Container>
      {/* <Box className={classes.headerContainer}>
        <Typography component="span" className={classes.divider} />
        <Typography component="p" className={classes.header}>
          {header}
        </Typography>
        <Typography component="span" className={classes.divider} />
      </Box> */}
      <ExpertInfo expert={expert} />
      {/* <TopSection author={expert} /> */}
      {page === 0 && loading === LoadingStatusEnum.pending ? (
        <LoadingContainer loading={LoadingStatusEnum.pending} expand />
      ) : (
        <>
          <PostsList postsList={materials} resetPage={setPage} mobile />
        </>
      )}
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
