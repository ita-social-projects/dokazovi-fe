import React, { FC } from 'react';
import { SwipeableDrawer, Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import ArrowForward from '../../assets/svg/ArrowForward.svg';
import { useStyles } from './FiltersMenu.styles';

interface IFiltersMenuProps {
  filtersMenuOpen: boolean;
  setFiltersMenuOpen: (value: boolean) => void;
  totalElements: number;
  SelectedTypes: JSX.Element;
  FilterCheckboxes: JSX.Element | false;
}

const FiltersMenu: FC<IFiltersMenuProps> = ({
  filtersMenuOpen,
  setFiltersMenuOpen,
  totalElements,
  SelectedTypes,
  FilterCheckboxes,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setFiltersMenuOpen(!filtersMenuOpen);
  };

  return (
    <SwipeableDrawer
      classes={{ paper: classes.root }}
      variant="temporary"
      anchor="left"
      open={filtersMenuOpen}
      onClose={handleDrawerToggle}
      onOpen={()=>{}}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Grid container>
        <Grid container direction="row" className={classes.containerSelected}>
          <Typography className={classes.headerSelected}>
            {t(langTokens.common.selected)}:
          </Typography>
          <Typography className={classes.headerSelectedCount}>
            {totalElements}{' '}
            {t(langTokens.materials.material, {
              count: totalElements,
            }).toLowerCase()}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          className={classes.selectedTypesContainer}
        >
          <Box className={classes.selectedTypes}>{SelectedTypes}</Box>
          <img src={ArrowForward} alt="Arrow forward" />
        </Grid>
        {FilterCheckboxes}
      </Grid>
    </SwipeableDrawer>
  );
};

export default FiltersMenu;
