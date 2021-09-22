import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
    <Button
      className={`
        ${classes.button} 
        ${filtersMenuOpen ? classes.close.toString() : classes.open.toString()}
      `}
      onClick={handleFiltersMenuToggle}
    >
      {filtersMenuOpen ? (
        <CloseIcon className={classes.closeIcon} />
      ) : (
        t(langTokens.common.filters)
      )}
    </Button>
  );
};

export default FiltersButton;
