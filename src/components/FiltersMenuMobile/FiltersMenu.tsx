import React, { FC } from 'react';
import { Drawer, Grid, Box, Typography } from '@material-ui/core';
import { ChipsList } from 'components/Chips/ChipsList/ChipsList';
import { ChipFilterType, filtersStateEnum, IOrigin } from 'old/lib/types';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './FiltersMenu.styles';

interface IFiltersMenuProps {
  filtersMenuOpen: boolean;
  setFiltersMenuOpen: (value: boolean) => void;
  totalElements: number;
  origins: {
    originsInPlural: IOrigin[];
    getOrigins: () => string;
    handleDelete: (
      key: number | undefined,
      chipsListType: ChipFilterType | undefined,
    ) => void;
    chipsListType: ChipFilterType | undefined;
    selectedOrigins: IOrigin[] | filtersStateEnum;
  };
}

const FiltersMenu: FC<IFiltersMenuProps> = ({
  filtersMenuOpen,
  setFiltersMenuOpen,
  totalElements,
  origins,
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
          <Box className={classes.subHeaderContainer}>
            {typeof origins.selectedOrigins === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allOrigins)}
              </Typography>
            ) : (
              <ChipsList
                filtersPlural={origins.originsInPlural}
                checkedNames={origins.getOrigins()}
                handleDelete={origins.handleDelete}
                chipsListType={origins.chipsListType}
              />
            )}
            {/* <Typography className={classes.divider} component="span">
              |
            </Typography>
            {typeof selectedPostTypes === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allTypes)}
              </Typography>
            ) : (
              <ChipsList
                filtersPlural={postTypesInPlural}
                checkedNames={getPostTypes()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.POST_TYPE}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            {typeof selectedDirections === 'string' ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                {t(langTokens.common.allDirections)}
              </Typography>
            ) : (
              <ChipsList
                checkedNames={getDirections()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.DIRECTION}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            <Typography
              className={classes.totalFilters}
              component="div"
              variant="subtitle2"
              color="textSecondary"
            >
              {totalElements}{' '}
              {t(langTokens.materials.material, {
                count: totalElements,
              }).toLowerCase()}
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FiltersMenu;
