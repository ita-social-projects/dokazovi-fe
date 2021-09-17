import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { langTokens } from 'locales/localizationInit';
import { useTranslation } from 'react-i18next';
import { useStyles } from './FiltersButton.styles';

interface IFiltersButtonProps {
  filtersMenuOpen: boolean;
  setFiltersMenuOpen: (value: boolean) => void;
}

const FiltersButton: FC<IFiltersButtonProps> = ({
  setFiltersMenuOpen,
  filtersMenuOpen,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleFiltersMenuToggle = () => {
    setFiltersMenuOpen(!filtersMenuOpen);
  };

  return (
    <Button className={classes.button} onClick={handleFiltersMenuToggle}>
      {filtersMenuOpen ? 'X' : t(langTokens.common.filters)}
    </Button>
  );
};

export default FiltersButton;
