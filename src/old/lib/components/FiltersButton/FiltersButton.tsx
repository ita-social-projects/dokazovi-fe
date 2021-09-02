import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { langTokens } from 'locales/localizationInit';
import { useTranslation } from 'react-i18next';
import { useStyles } from './FiltersButton.styles';

const FiltersButton: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Button className={classes.button}>{t(langTokens.common.filters)}</Button>
  );
};

export default FiltersButton;
