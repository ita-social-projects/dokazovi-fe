import React, { FC } from 'react';
import { Drawer, Grid, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
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
    <Drawer
      classes={{ paper: classes.root }}
      variant="temporary"
      anchor="left"
      open={filtersMenuOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Grid container>
        <Grid container direction="row" justifyContent="space-between">
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
        <Grid container direction="row">
          <Box className={classes.selectedTypes}>{SelectedTypes}</Box>
        </Grid>

        {FilterCheckboxes}
      </Grid>
    </Drawer>
  );
};

export default FiltersMenu;
